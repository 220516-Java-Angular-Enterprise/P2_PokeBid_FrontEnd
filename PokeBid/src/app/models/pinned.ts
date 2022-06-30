import { CardListing } from './cardListing';
import { User } from './users';

export interface Pinned{
  id: string;
  user: User;
  cardListing: CardListing;
}