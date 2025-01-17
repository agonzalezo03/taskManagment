
export interface Rol{
  id: string
  name :String,
  permissions :{resourceName: string, permission: number}[]
}
