import { Charector } from "../modals/Charector";
import instance from "./apiClient";

export const getCharectors = (): Promise<Charector[]> => {
  return instance.get(`api/v2/Characters`).then((res) => res.data);
};
