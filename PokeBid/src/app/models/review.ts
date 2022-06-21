import { CardListing } from './cardListing';
import { User } from './users';
import { Timestamp } from "rxjs";

export interface Review {
  id: string;
  listing: CardListing;
  user: User;
  review: string;
  timestamp: Timestamp;


}