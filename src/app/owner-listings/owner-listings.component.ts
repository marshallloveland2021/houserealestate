import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { Post } from '../post';

@Component({
  selector: 'app-owner-listings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-listings.component.html',
  styleUrls: ['./owner-listings.component.css'],
})
export class OwnerListingsComponent {
  private dataService = inject(DataService);
  private userService = inject(UserService);

  posts: Post[] = [];

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.posts = this.dataService
        .getAllPosts()
        .filter((post) => post.userId === user.id);
    }
  }

  updateStatus(post: Post, status: 'sold' | 'rented' | 'available') {
    post.status = status;
    localStorage.setItem(
      'posts',
      JSON.stringify(this.dataService.getAllPosts())
    );
  }

  deletePost(id: number) {
    this.dataService.deletePost(id);
    this.posts = this.posts.filter((p) => p.id !== id);
  }
}
