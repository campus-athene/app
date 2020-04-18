const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const { getType } = require('mime');

const bucket = 'campus-pwa';
let version;



async function createBucket() {
  const aws = require('aws-sdk');
  const s3 = new aws.S3();

  console.log(`Creating bucket ${bucket}...`);
  await s3.createBucket({
    Bucket: bucket,
    CreateBucketConfiguration: {
      LocationConstraint: 'eu-central-1'
    }
  }).promise();

  console.log(`Updating bucket policy...`)
  await s3.putBucketPolicy({
    Bucket: bucket,
    Policy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [{
        Sid: "PublicReadGetObject",
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: `arn:aws:s3:::${bucket}/*`
      }]
    })
  }).promise();

  console.log(`Bucket creation successful.`);
}



async function checkRepoClean() {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf-8' });

  if (gitStatus)
    throw 'Repository is not clean, exiting.';

  console.log('Repository clean.');
}

async function getVersion() {
  const gitVersions = execSync('git tag', { encoding: 'utf-8' });
  const lastVersion = Array.from(gitVersions.matchAll(/^V_(?<major>\d*)\.(?<minor>\d*)(\.(?<rev>\d*))?$/gm),
    m => [Number.parseInt(m.groups.major), Number.parseInt(m.groups.minor), Number.parseInt(m.groups.rev) || 0])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]).splice(-1)[0];

  console.log(`Version ${lastVersion[0]}.${lastVersion[1]}${lastVersion[2] ? `.${lastVersion[2]}` : ''} was last version.`);

  const cli = readline.createInterface(process.stdin, process.stdout);
  const versionInput = await new Promise((res) =>
    cli.question('Please enter new version: ', answer => res(answer)));
  cli.close();

  const match = versionInput.match(/^(?<major>[1-9]\d*|0)\.(?<minor>[1-9]\d*|0)(\.(?<rev>[1-9]\d*))?$/);
  if (!match) {
    throw ('The entered version is not valid, exiting.');
  }

  version = versionInput;
}

async function createTag() {
  execSync(`git tag V_${version}`);
}

function build() {
  const result = spawnSync(
    'node',
    ['./node_modules/react-scripts/scripts/build'],
    { stdio: 'inherit' }
  );

  if (result.status)
    process.exit(result.status);
}

async function createScripts() {
  console.log('Creating scripts.txt ...');
  const html = fs.readFileSync('./build/index.html', 'utf-8');
  const scripts = html.match(/<script>.*<\/script>/)[0];
  fs.writeFileSync('./build/scripts.txt', scripts);
}

async function upload() {
  // Strictly speaking we should make sure to upload the files in the right order.

  const aws = require('aws-sdk');
  const s3 = new aws.S3();

  function getUploadPromises(dir = '') {
    const childs = fs.readdirSync('./build/' + dir, { withFileTypes: true });

    return childs.map(c => {
      const path = dir + c.name;

      if (c.isDirectory())
        return getUploadPromises(path + '/');

      return () => {
        console.log(`Uploading ${path} ...`);
        const promise = s3.upload({
          Bucket: bucket,
          Key: path,
          ContentType: getType(c.name),
          Body: fs.readFileSync('./build/' + path)
        }).promise();
        return promise;
      };
    }).flat();
  }

  const tasks = getUploadPromises();
  for (const task of tasks) {
    await task();
  }
}



async function run() {
  console.log('Publish script started.');
  try {
    // // Once
    // await createBucket();

    await checkRepoClean();
    await getVersion();
    await createTag();
    await build();
    await createScripts();
    await upload();
  }
  catch (error) {
    console.log('Publish failed.');
    console.log(error);
    return;
  }
  console.log(`Successfully published version ${version}.`);
}

run();
