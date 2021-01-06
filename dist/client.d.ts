declare type Variables = {
  [key: string]: any;
};
export declare class LinearClient {
  private apiKey;
  constructor(apiKey: string);
  request<T extends any>(query: string, variables?: Variables): Promise<T>;
}
export {};
