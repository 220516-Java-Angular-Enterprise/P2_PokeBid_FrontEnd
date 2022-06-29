import { CardListing } from './cardListing';
import { User } from './users'

export interface Notification{
  user: User;
  cardListing: CardListing; 
  message?: string;
  
}