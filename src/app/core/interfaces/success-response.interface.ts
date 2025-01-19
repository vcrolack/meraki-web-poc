export interface SuccessResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}
