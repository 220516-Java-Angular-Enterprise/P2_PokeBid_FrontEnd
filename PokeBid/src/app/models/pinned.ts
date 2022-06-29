import { CardListing } from './cardListing';
import { User } from './user';

export interface Pinned{
  id: string;
  user: User;
  cardListing: CardListing;

}