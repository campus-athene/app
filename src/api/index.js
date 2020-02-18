const base = "http://localhost:8110";

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

  getExamsResults = () => new Promise((resolve, reject) => {
    fetch(base + "/tucan/examresults", {
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
