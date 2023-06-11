export class NetworkError extends Error {}

export class ServerError extends Error {
  constructor(response) {
    super(
      response?.message ||
        'Ein unbekannter serverseitiger Fehler ist aufgetreten.'
    );
    this.response = response;
  }
}
