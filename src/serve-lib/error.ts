interface ApiErrorOptions extends ErrorOptions {
  status?: number;
}

export class AppError extends Error {
  status: number | undefined;
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, { cause: options?.cause });
    this.status = options?.status;
  }
}