import { Injectable, signal } from '@angular/core';
import { User } from './user';
import { defaultUsers } from './user-data';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];
  private currentUser = signal<User | null>(null);
  private nextId = 100;

  constructor() {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : defaultUsers;

    const savedId = localStorage.getItem('loggedInUserId');
    if (savedId) {
      const user = this.users.find(u => u.id === Number(savedId));
      if (user) {
        this.currentUser.set(user);
      }
    }
  }

  getUserSignal() {
    return this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  getAllUsers(): User[] {
    return this.users;
  }

  loginAs(userId: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.currentUser.set(user);
      localStorage.setItem('loggedInUserId', user.id.toString());
    }
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (user) {
      this.currentUser.set(user);
      localStorage.setItem('loggedInUserId', user.id.toString());
      return true;
    }
    return false;
  }

  register(email: string, password: string, role: 'renter' | 'owner'): boolean {
    const emailTaken = this.users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailTaken) return false;

    const newUser: User = {
      id: this.nextId++,
      username: email.split('@')[0],
      email,
      password,
      role,
      verified: role === 'owner'
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('loggedInUserId', newUser.id.toString());
    this.currentUser.set(newUser);
    return true;
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('loggedInUserId');
  }
  
  createUser(username: string, email: string, password: string, role: 'renter' | 'owner' | 'admin'): boolean {
    const emailTaken = this.users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailTaken) return false;
  
    const newUser: User = {
      id: this.nextId++,
      username,
      email,
      password,
      role,
      verified: role === 'owner'
    };
  
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }
  
  verifyUser(userId: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.verified = true;
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  suspendUser(userId: number) {
    this.users = this.users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(this.users));

    if (this.getCurrentUser()?.id === userId) {
      this.logout();
    }
  }

  resetUsersToDefault() {
    this.users = [...defaultUsers];
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
