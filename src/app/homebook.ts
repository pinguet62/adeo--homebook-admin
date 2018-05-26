export interface HomebookResult<T = any> {
  status: string;
  data: T;
  errors: string | string[];
}

export function isWrappedResult(value: any) {
  return typeof value === 'object' && ['status', 'data', 'errors'].every((field) => field in value);
}
