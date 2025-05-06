import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent {
  id = input.required<number>();
  dataService = inject(DataService);
  post?: Post;

  ngOnInit() {
    const id = this.id();
    console.log('Post ID:', id);
    this.post = this.dataService.getPostById(id);
    console.log('Loaded Post:', this.post);
  }
}
