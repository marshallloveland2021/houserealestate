import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent {
  private dataService = inject(DataService);
  private userService = inject(UserService);
  private router = inject(Router);

  newPost = {
    title: '',
    body: '',
    price: 0,
    location: '',
    imageUrl: '',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 500,
    isRental: false
  };

  onSubmit() {
    const user = this.userService.getCurrentUser();
    if (!user || user.role !== 'owner') {
      alert('Only verified owners can create listings.');
      return;
    }
  
    const completePost = {
      ...this.newPost,
      id: Date.now(),
      userId: user.id,
      verified: false,
      status: 'available' as 'available',  // ✅ Cast to narrow type
    };
  
    this.dataService.addPost(completePost);
  
    alert('Listing created and pending admin approval!');
    this.router.navigate(['/account']);
  }
  
}
