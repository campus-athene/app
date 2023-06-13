export class NetworkError extends Error {}

export class ServerError extends Error {
  response?: { message: string };

  constructor(response?: { message: string }) {
    super(
      response?.message ||
        'Ein unbekannter serverseitiger Fehler ist aufgetreten.'
    );
    this.response = response;
  }
}
