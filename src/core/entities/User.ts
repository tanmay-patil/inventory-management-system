export type Role = 'ADMIN' | 'MANAGER' | 'ENGINEER';

export interface User {
  id: string;
  username: string;
  role: Role;
  name: string;
}
