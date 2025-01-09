import { State } from "./state.enum";

export interface Task{
  id: string;
  name: string;
  dificulty: number;
  assign: [];
  categories: [];
  epicId: string;
  state: State
}
