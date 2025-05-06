import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { User } from '../user';
import { Post } from '../post';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private userService = inject(UserService);
  private dataService = inject(DataService);

  message = '';
  owner!: User;
  post!: Post;
  currentUser = this.userService.getCurrentUser();

  ngOnInit() {
    const ownerId = Number(this.route.snapshot.paramMap.get('ownerId'));
    const postId = Number(this.route.snapshot.paramMap.get('postId'));
  
    this.currentUser = this.userService.getCurrentUser();
  
    if (!this.currentUser) {
      // Redirect to register/login with return URL
      alert('You must be logged in to send a message.');
      this.router.navigate(['/messages', this.owner.id, this.post.id]);
      return;
    }
  
    this.owner = this.userService.getAllUsers().find(u => u.id === ownerId)!;
    this.post = this.dataService.getPostById(postId)!;
  }
  

  sendMessage() {
    if (!this.message.trim()) return;

    this.messageService.sendMessage(
      this.currentUser!.id,
      this.owner.id,
      this.post.id,
      this.message.trim()
    );
    alert('Message sent!');
    this.router.navigate(['/messages', this.owner.id]);
  }
}
