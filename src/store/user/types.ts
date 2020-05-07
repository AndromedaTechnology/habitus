export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface UserState {
  user?: User;
}
