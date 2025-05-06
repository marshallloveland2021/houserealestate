import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from './message';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-message-thread',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-thread.component.html',
  styleUrls: ['./message-thread.component.css']
})
export class MessageThreadComponent {
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private userService = inject(UserService);

  messages: Message[] = [];
  newMessage = ''; // ✅ This line MUST be here
  otherUserId!: number;
  postId!: number;
  currentUserId: number = 0;

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    this.currentUserId = user.id;
    this.otherUserId = Number(this.route.snapshot.paramMap.get('otherUserId'));
    this.postId = Number(this.route.snapshot.paramMap.get('postId'));

    this.loadMessages();
  }

  loadMessages() {
    this.messages = this.messageService.getMessagesBetweenUsers(
      this.currentUserId,
      this.otherUserId
    ).filter(m => m.postId === this.postId);
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.messageService.sendMessage(
      this.currentUserId,
      this.otherUserId,
      this.postId,
      this.newMessage.trim()
    );

    this.newMessage = '';
    this.loadMessages();
  }
}
