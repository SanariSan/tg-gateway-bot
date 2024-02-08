class NotFoundError extends Error {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor({
    message,
    miscellaneous,
  }: {
    message: string;
    miscellaneous?: Record<string, unknown>;
  }) {
    super(message);

    this.name = 'NotFoundError';
    this.description = `Requested route or method not found`;
    this.miscellaneous = miscellaneous;
  }
}

export { NotFoundError };
