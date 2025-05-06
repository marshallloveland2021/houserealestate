import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { AccountRenterComponent } from '../account-renter/account-renter.component';
import { AccountOwnerComponent } from '../account-owner/account-owner.component';
import { AccountAdminComponent } from '../account-admin/account-admin.component';
import { MessageInboxComponent } from '../message-inbox/message-inbox.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    AccountRenterComponent,
    AccountOwnerComponent,
    AccountAdminComponent,
    MessageInboxComponent
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  public userService = inject(UserService);
  private router = inject(Router);

  userSignal = this.userService.getUserSignal();
  user = computed(() => this.userSignal());

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
