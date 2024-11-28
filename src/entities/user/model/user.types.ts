import { GamePayload } from "@entities/game";

export type ProfilePayload = {
  created_at: string;
  id: string;
  name: string;
  status: "PLAYER" | "ADMIN";
  user_id: string;
  vime_id: string;
};

export type UserPayload = {
  id: string;
  games: GamePayload[];
  profile: ProfilePayload;
  rating: number;
  roles: any;
};

export type User = {
  isAuth: boolean;
  isLoading: boolean;
  payload: UserPayload | any;
  profile: UserPayload | any;
  games: GamePayload[];

  setAuth: (value: boolean) => void;
  setPayload: (payload: UserPayload) => void;
  setProfile: (payload: UserPayload) => void;
  getInfoByUsername: (username: string) => void;
  getGames: (username: string) => void;
  auth: (token: string) => void;
  logout: () => void;
  getInfo: () => void;
};

export type QueueStatuses = "ready" | "searching";

export interface QueueResponse<T> {
  status: QueueStatuses;
  payload: T;
  url?: string;
}
