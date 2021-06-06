import { NetworkError, ServerError } from "./errors";
const base = process.env.NODE_ENV === 'development' ?
  "http://localhost:3010" :
  "https://dffblc0bqe.execute-api.eu-central-1.amazonaws.com/v2";

export class session {
  constructor(creds) {
    this.token = creds.token;
  }

  static login = (username, password) => new Promise((resolve, reject) => {
    fetch(base + "/account/login2", {
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

  subscribePNS = (registrationId, registrationType) => new Promise((resolve, reject) => {
    fetch(base + '/account/subscribepns', {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `tucan ${this.token}`
      },
      body: JSON.stringify({ registrationId, registrationType })
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
        reject(new ServerError(body));
      }
    })
    .catch(error => {
      reject(new NetworkError());
    });
  });

  getCourseOffers = () =>
    new Promise((resolve, reject) => {
      fetch(base + '/tucan/courseoffers', {
        headers: { Authorization: `tucan ${this.token}` },
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.success) resolve(body.result);
          else reject(new ServerError(body));
        })
        .catch(() => reject(new NetworkError()));
    });

  markMsgRead = async (messageId) => new Promise((resolve, reject) => {
    fetch(base + '/tucan/markmsgread', {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `tucan ${this.token}`
      },
      body: JSON.stringify({ messageId })
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

  markAllMsgsRead = async (messageId) => new Promise((resolve, reject) => {
    fetch(base + '/tucan/markallmsgsread', {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `tucan ${this.token}`
      },
      body: JSON.stringify({ messageId })
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
}
