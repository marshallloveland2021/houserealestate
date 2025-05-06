import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-message-inbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-inbox.component.html',
  styleUrls: ['./message-inbox.component.css'],
})
export class MessageInboxComponent implements OnInit {
  private messageService = inject(MessageService);
  private userService = inject(UserService);
  private router = inject(Router);

  currentUser: any = null;
  threads: any[] = [];

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) {
      this.threads = this.messageService.getThreadsForUser(this.currentUser.id);
      console.log('Threads loaded:', this.threads);
    } else {
      console.warn('No user logged in.');
    }
  }

  openThread(thread: any) {
    console.log('Opening thread:', thread);
    this.router.navigate(['/messages', thread.otherUserId, thread.postId]);
  }
}
