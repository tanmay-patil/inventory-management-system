export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  ENGINEER = 'ENGINEER',
}

export interface User {
  id: string;
  username: string;
  role: Role;
  name: string;
}
