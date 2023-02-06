export interface MessageLogger {
  error(message: string, stack?: string): Promise<void> | void;

  log(message: object | string, options?: any): Promise<void> | void;
}