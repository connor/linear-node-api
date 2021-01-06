import { LinearClient } from "./client";

interface Team {
  id: string;
  name: string;
  organization: {
    users: Array<{
      id: string;
      displayName: string;
    }>;
  };
  states: Array<{
    id: string;
    name: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
  }>;
}

interface NewIssue {
  title: string;
  description?: string;
  label_ids?: string[];
  assignee?: string;
  state?: string;
  project?: string;
}

export class Linear {
  private client: LinearClient;
  private team_id: string;

  constructor(apiKey: string, team_id: string) {
    this.client = new LinearClient(apiKey);
    this.team_id = team_id;
  }

  public async createIssue(issue: NewIssue) {
    await this.client.request(
      `mutation createIssue(
            $teamId: String!, 
            $title: String!, 
            $description: String, 
            $labelIds: [String!]!, 
            $assigneeId: String,
            $stateId: String,
            $projectId: String,
        ) {
            issueCreate(
                input: {
                    teamId: $teamId
                    title: $title
                    description: $description
                    assigneeId: $assigneeId
                    stateId: $stateId
                    labelIds: $labelIds
                    projectId: $projectId
                }
            ) {
                lastSyncId
            }
        }
        `,
      {
        teamId: this.team_id,
        title: issue.title,
        description: issue.description,
        labelIds: issue.label_ids,
        assigneeId: null,
        stateId: null,
        projectId: null
      }
    );
  }
}
