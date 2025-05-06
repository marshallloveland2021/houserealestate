import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute); // ✅ Get query param

  email = '';
  password = '';
  role: 'renter' | 'owner' = 'renter';
  isRegistering = false;
  error = '';

  toggleForm() {
    this.isRegistering = !this.isRegistering;
    this.error = '';
  }

  onSubmit() {
    if (!this.email || (!this.isRegistering && !this.password)) {
      this.error = 'Please fill out all required fields.';
      return;
    }

    if (this.isRegistering) {
      const registered = this.userService.register(this.email, this.password, this.role);
      if (!registered) {
        this.error = 'Email already exists.';
        return;
      }
    } else {
      const loggedIn = this.userService.login(this.email, this.password);
      if (!loggedIn) {
        this.error = 'Invalid email or password.';
        return;
      }
    }

    const returnTo = this.route.snapshot.queryParamMap.get('returnTo');
    this.router.navigate([returnTo || '/account']); // ✅ Redirect to intended page
  }
}
