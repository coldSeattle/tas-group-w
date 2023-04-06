type Actor = {
  avatar_url: string;
  display_login: string;
  gravatar_id: string;
  id: number;
  login: string;
  url: string;
};

type Payload = {
  description: string;
  master_branch: string;
  pusher_type: string;
  ref: string | null;
  ref_type: string;
};

type Repo = {
  id: number;
  name: string;
  url: string;
};

type Event = {
  actor: Actor;
  created_at: string;
  id: string;
  payload: Payload;
  public: boolean;
  repo: Repo;
  type: string;
};

type EventItem = Actor & Payload & Repo & Event;

export type { Actor, Payload, Repo, Event, EventItem };
