import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-account-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.css'],
})
export class AccountAdminComponent {
  userService = inject(UserService);
  users = this.userService.getAllUsers();
  dataService = inject(DataService);
  posts = this.dataService.posts;

  verifyUser(userId: number) {
    this.userService.verifyUser(userId);
    this.users = this.userService.getAllUsers();
  }

  suspendUser(userId: number) {
    this.userService.suspendUser(userId);
    this.users = this.userService.getAllUsers();
  }

  deleteListing(postId: number) {
    this.dataService.deletePost(postId);
    this.posts = this.dataService.posts;
  }

  confirm(message: string): boolean {
    return window.confirm(message);
  }

  verifyPost(postId: number) {
    const post = this.dataService.getPostById(postId);
    if (post) {
      post.verified = true;
      this.dataService.updatePost(post);
      this.posts = this.dataService.posts;
    }
  }

  unverifyUser(userId: number) {
    const user = this.userService.getAllUsers().find((u) => u.id === userId);
    if (user) {
      user.verified = false;
      localStorage.setItem(
        'users',
        JSON.stringify(this.userService.getAllUsers())
      );
      this.users = this.userService.getAllUsers();
    }
  }

  unverifyPost(postId: number) {
    const post = this.dataService.getPostById(postId);
    if (post) {
      post.verified = false;
      this.dataService.updatePost(post);
      this.posts = this.dataService.getAllPosts();
    }
  }
}
