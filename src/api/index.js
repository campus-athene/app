const base = "https://0re227lzyl.execute-api.eu-central-1.amazonaws.com/v1";

export class session {
  constructor(creds) {
    this.token = creds.token;
  }

  static login = (username, password) => new Promise((resolve, reject) => {
    fetch(base + "/account/login", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(body => {
      if (body.success) {
        resolve(body);
      }
      else {
        reject(body.message ?? "Ein unbekannter Fehler ist aufgetreten.")
      }
    })
    .catch(error => {
      reject("Ein unbekannter Fehler ist aufgetreten. Besteht eine Internetverbindung?");
    });
  });

  getExams = () => new Promise((resolve, reject) => {
    fetch(base + "/tucan/exams", {
      headers: { 'Authorization': `tucan ${this.token}` }
    })
    .then(response => response.json())
    .then(body => {
      if (body.success) {
        resolve(body);
      }
      else {
        reject(body.message ?? "Ein unbekannter Fehler ist aufgetreten.")
      }
    })
    .catch(error => {
      reject("Ein unbekannter Fehler ist aufgetreten. Besteht eine Internetverbindung?");
    });
  });
}
