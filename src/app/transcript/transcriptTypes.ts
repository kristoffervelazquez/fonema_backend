export interface Transcript {
  id?: number;
  created_at?: string;
  original_json: string;
  summary?: string;
  sentiment?: {
    score: string;
    reason: string;
  };
  action_items?: {
    owner: string;
    task: string;
    ts: string;
  }[];
}

export interface Analysis {
  summary: string;
  sentiment: {
    score: string;
    reason: string;
  };
  action_items: {
    owner: string;
    task: string;
    ts: string;
  }[];
}
