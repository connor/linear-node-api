interface NewIssue {
  title: string;
  description?: string;
  label_ids?: [string];
  assignee?: string;
  state?: string;
  project?: string;
}
export declare class Linear {
  private client;
  private team_id;
  constructor(apiKey: string, team_id: string);
  createIssue(issue: NewIssue): Promise<void>;
}
export {};
