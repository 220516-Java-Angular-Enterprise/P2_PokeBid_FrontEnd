import { CardListing } from './cardListing';
import { User } from './user'
import { Timestamp } from 'rxjs';

export interface Notification{
  id?: string;
  user: User;
  cardListing: CardListing; 
  message?: string;
}