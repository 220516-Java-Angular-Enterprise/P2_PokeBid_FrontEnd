import { CardListing } from './cardListing';
import { User } from './user';
import { Timestamp } from "rxjs";

export interface Review {
  id: string;
  listing: CardListing;
  user: User;
  review: string;
  timestamp: Timestamp<number>;


}