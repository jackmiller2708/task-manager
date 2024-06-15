export class DbInitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbInitializationError";
  }
}
