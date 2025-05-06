import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-message-inbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-message-inbox.component.html',
  styleUrls: ['./owner-message-inbox.component.css']
})
export class OwnerMessageInboxComponent implements OnInit {
  private messageService = inject(MessageService);
  private userService = inject(UserService);
  private router = inject(Router);

  threads: any[] = [];
  currentUser = this.userService.getCurrentUser();

  ngOnInit() {
    if (!this.currentUser) return;

    this.threads = this.messageService.getThreadsForOwner(this.currentUser.id);
    console.log('📬 Owner Threads:', this.threads);
  }

  openThread(thread: any) {
    this.router.navigate(['/messages', thread.otherUserId, thread.postId]);
  }
}
