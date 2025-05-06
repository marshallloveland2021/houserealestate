import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { Post } from '../post';
import { OwnerMessageInboxComponent } from '../owner-message-inbox/owner-message-inbox.component';
import { OwnerListingsComponent } from '../owner-listings/owner-listings.component';

@Component({
  selector: 'app-account-owner',
  standalone: true,
  imports: [
    CommonModule,
    OwnerMessageInboxComponent,
    OwnerListingsComponent,
    RouterModule,
  ],
  templateUrl: './account-owner.component.html',
  styleUrls: ['./account-owner.component.css'],
})
export class AccountOwnerComponent {
  private dataService = inject(DataService);
  private userService = inject(UserService);

  posts: Post[] = [];

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.posts = this.dataService.getPostsByUser(user.id);
    }
  }

  updateStatus(post: Post, status: 'sold' | 'rented' | 'available') {
    post.status = status;
    this.dataService.updatePost(post);
  }

  deletePost(postId: number) {
    this.dataService.deletePost(postId);
    this.posts = this.posts.filter((p) => p.id !== postId);
  }
}
