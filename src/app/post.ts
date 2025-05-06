export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  price: number;
  location: string;
  imageUrl?: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  isRental: boolean;
  verified: boolean;
  status?: 'available' | 'sold' | 'rented';
}
