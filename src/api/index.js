import { NetworkError, ServerError } from "./errors";
const base = process.env.NODE_ENV === 'development' ?
  "http://localhost:3010" :
  "https://0re227lzyl.execute-api.eu-central-1.amazonaws.com/v1";

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

  sync = () => new Promise((resolve, reject) => {
    fetch(base + "/tucan/sync", {
      headers: { 'Authorization': `tucan ${this.token}` }
    })
    .then(response => response.json())
    .then(body => {
      if (body.success) {
        resolve(body);
      }
      else {
        reject(new ServerError(body.message));
      }
    })
    .catch(error => {
      reject(new NetworkError());
    });
  });

  registerCourse = async (rgtrArgs)  => new Promise((resolve, reject) => {
    fetch(base + '/tucan/registercourse', {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `tucan ${this.token}`
      },
      body: JSON.stringify(rgtrArgs)
    })
      .then(response => response.json())
      .then(body => {
      if (body.success) {
        resolve(body);
      }
      else {
        reject(body.message ?? "Ein unbekannter Fehler ist aufgetreten.");
      }
    })
    .catch(error => {
      console.log("Ein unbekannter Fehler ist aufgetreten. Besteht eine Internetverbindung?");
      reject("Ein unbekannter Fehler ist aufgetreten. Besteht eine Internetverbindung?");
    });
  });

  registerExam = async (id, semester, type) => {
    try {
      const response = await fetch(base + '/tucan/registerexam', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `tucan ${this.token}`
        },
        body: JSON.stringify({ id, semester, type })
      });
      const body = await response.json();
      
      return body;
    }
    catch {
      return { success: false, message: "Ein unbekannter Fehler ist aufgetreten. Besteht eine Internetverbindung?" };
    }
  };

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
