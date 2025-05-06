import { Component, inject, computed } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../post';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  postService = inject(DataService);
  searchService = inject(SearchService);
  posts: Post[] = [];

  filterBedrooms: number = 0;
  filterBathrooms: number = 0;
  filterSqft: number = 0;
  filterPrice: number = 0;
  filterRentalOnly: boolean = false;

  filteredPosts = computed(() => {
    const term = this.searchService.searchTerm().toLowerCase();
    return this.posts.filter(post =>
      post.verified &&
      (!term || post.title.toLowerCase().includes(term) || post.body.toLowerCase().includes(term)) &&
      (!this.filterBedrooms || post.bedrooms >= this.filterBedrooms) &&
      (!this.filterBathrooms || post.bathrooms >= this.filterBathrooms) &&
      (!this.filterSqft || post.sqft >= this.filterSqft) &&
      (!this.filterPrice || post.price <= this.filterPrice) &&
      (!this.filterRentalOnly || post.isRental === true)
    );
  });

  clearLocalStorage() {
    localStorage.removeItem('posts');
    location.reload();
  }

  ngOnInit() {
    this.posts = this.postService.posts;
  }
}
