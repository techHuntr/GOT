import { Charector } from "./Charector";

export interface IStartUpState {
  status: string;
  charectors: Charector[];
  error: any | undefined;
  pages: number[] | undefined;
}
