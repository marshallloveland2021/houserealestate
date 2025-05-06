import { Injectable } from '@angular/core';
import { Post } from './post';
import { defaultPosts } from './post-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  posts: Post[] = [];

  constructor() {
    const stored = localStorage.getItem('posts');
    const parsed = stored ? JSON.parse(stored) : null;

    this.posts = Array.isArray(parsed) && parsed.length ? parsed : defaultPosts;

    console.log('🚀 Posts loaded into DataService:', this.posts);
  }

  getPostById(id: number): Post | undefined {
    return this.posts.find((p: Post) => Number(p.id) === Number(id));
  }

  deletePost(id: number) {
    this.posts = this.posts.filter((p: Post) => p.id !== id);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  getAllPosts() {
    return this.posts;
  }

  updatePost(updatedPost: Post) {
    const index = this.posts.findIndex((p) => p.id === updatedPost.id);
    if (index > -1) {
      this.posts[index] = updatedPost;
      localStorage.setItem('posts', JSON.stringify(this.posts));
    }
  }

  addPost(post: Post) {
    post.verified = false;
    this.posts.push(post);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  getPostsByUser(userId: number): Post[] {
    return this.posts.filter((post) => post.userId === userId);
  }
}
