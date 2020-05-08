export interface User {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UserState {
  user?: User;
}
