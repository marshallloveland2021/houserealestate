import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from './search.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTerm: string = '';
  public userService = inject(UserService); // ✅ Make it public for template access
  user = computed(() => this.userService.getUserSignal()());

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.searchTerm.set(this.searchTerm);
  }
}
