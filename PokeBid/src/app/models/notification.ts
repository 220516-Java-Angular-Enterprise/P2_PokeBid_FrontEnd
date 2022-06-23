import { CardListing } from './cardListing';
import { Timestamp } from 'rxjs';
export interface Notification{
  message: string;
  time: Timestamp<number>;
  listing: CardListing; 
}