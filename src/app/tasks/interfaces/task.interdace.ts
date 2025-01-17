import { State } from "./state.enum";

export interface Task{
  id: string;
  name: string;
  description: string;
  difficulty: number;
  assign: string[];
  categories: string[];
  epicId: string;
  state: State
  sprintId: string
}
