export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // <-- must be included now
    role: 'renter' | 'owner' | 'admin';
    verified?: boolean;
  }
  