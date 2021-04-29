export class NetworkError extends Error {}

export class ServerError extends Error {
  constructor(response) {
    super(response.message);
    this.response = response;
  }
}
