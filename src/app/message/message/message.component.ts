import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../user.service';
import { MessageService } from '../../message.service';
import { Message } from '../../message'; // ✅ Import Message model

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  currentUser = this.userService.getCurrentUser();

  get threads() {
    if (!this.currentUser) return [];

    if (this.currentUser.role === 'owner') {
      return this.messageService.getThreadsForOwner(this.currentUser.id); // ✅ Correct usage
    } else {
      return this.messageService.getThreadsForUser(this.currentUser.id);  // ✅ Correct usage
    }
  }

  
  openThread(thread: { otherUserId: number, postId: number }) {
    this.router.navigate(['/messages', thread.otherUserId, thread.postId]);
  }
}
