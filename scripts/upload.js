const { spawnSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const { getType } = require('mime');

const bucket = 'campus-pwa-dev';
let version;


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
  console.log('Upload script started.');
  try {
    // // Once
    // await createBucket();

    console.log('Make sure to change api url to dev!');
    const cli = readline.createInterface(process.stdin, process.stdout);
    await new Promise((res) =>
      cli.question('Press enter to continue.', answer => res(answer)));
    cli.close();

    await build();
    await createScripts();
    await upload();
  }
  catch (error) {
    console.log('Upload failed.');
    console.log(error);
    return;
  }
  console.log(`Successfully uploaded version ${version}.`);
}

run();
