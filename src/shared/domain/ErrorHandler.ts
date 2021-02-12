export class ErrorHandler extends Error {
  constructor(public message: string, public statusCode: number) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
