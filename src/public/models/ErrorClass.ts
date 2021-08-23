export class ExtendedError extends Error {
  constructor(message: string, public statusCode?: number, public data?: any) {
    super(message);
  }
}
