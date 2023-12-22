export interface Istandings {
  response: {
    Standings: Standings[];
  };
}

export interface Standings {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  goalsDiff: number;
  points: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
  };
}
