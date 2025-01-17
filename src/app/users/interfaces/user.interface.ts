import { Rol } from "../../roles/interfaces/role.interface";

export interface User{
  id: string;
  name: string;
  password: string;
  rol: string;
}
