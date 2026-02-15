export interface ApiErrorResponse {
  status: 'fail' | 'error';
  type: string;
  message: string;
}
