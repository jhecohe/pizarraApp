export default interface Team {
  id: string;
  key: string;
  name: string;
  position: number;
  points: number;
  mPlayed: number;
  mWons: number;
  mDrawn: number;
  mLosts: number;
  gF: number;
  gA: number;
  gD: number;
  nextMatchs?: string;
  image?: string;
  league: string;
  check?: boolean;
}
