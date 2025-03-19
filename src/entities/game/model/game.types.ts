export type GamePayload = {
  id: string;
  map_id: string;
  map_name: string;
  winners: GameUserPayload[];
  losers: GameUserPayload[];
  events: any;
  created_at: Date;
};

export type GameUserPayload = {
  id: number;
  spentGold: number;
  spentBronze: number;
  spentIron: number;
  aliveTime: number;
  kills: number;
  deaths: number;
  brokenBeds: number;
  dead: boolean;
  _id: string;
  rating: number;
  username: string;
};

export type Game = {
  payload: GamePayload | any;

  setPayload: (payload: GamePayload) => void;
  getInfo: () => void;
};
