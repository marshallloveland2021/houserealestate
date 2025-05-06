import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userService = inject(UserService);
  router = inject(Router);

  email = '';
  password = '';
  role: 'renter' | 'owner' = 'renter';
  error = '';

  onSubmit() {
    const success = this.userService.register(
      this.email,
      this.password,
      this.role
    );
    if (!success) {
      this.error = 'Email is already in use.';
      return;
    }
    this.router.navigate(['/account']);
  }
}
