import { CardListing } from './cardListing';
import { User } from './users'

export interface Notification{
  id?: string;
  user: User;
  cardListing: CardListing; 
  message?: string;
  
}