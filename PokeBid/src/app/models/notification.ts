import { CardListing } from './cardListing';
import { User } from './users'
import { Timestamp } from 'rxjs';

export interface Notification{
  id?: string;
  user: User;
  cardListing: CardListing; 
  message?: string;
}