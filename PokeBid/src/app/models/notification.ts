import { CardListing } from './cardListing';
import { Timestamp } from 'rxjs';
export interface Notification{
  title: string;
  message: string;
  time: Timestamp<number>;
  listing: CardListing; 
}