export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  price: number;
  location: string;
  imageUrl?: string;
  bedrooms: number;   // required
  bathrooms: number;  // required
  sqft: number;       // required
  isRental: boolean;
  verified: boolean;
  status?: 'available' | 'sold' | 'rented';
}
