export interface HomebookResult<T = any> {
  status: string;
  data: T;
  errors: string | string[];
}
