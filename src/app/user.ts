export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'renter' | 'owner' | 'admin';
  verified?: boolean;
}
