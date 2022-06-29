import { CardListing } from './cardListing';
import { User } from './users'
import { Timestamp } from 'rxjs';

export interface Notification{
  user: User;
  cardListing: CardListing; 
  message?: string;
}