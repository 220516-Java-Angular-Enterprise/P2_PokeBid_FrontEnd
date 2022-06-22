import { CardListing } from './cardListing';
import { User } from './users';
import { Status } from './status';
import { Timestamp } from 'rxjs';

export interface History{
  id: string;
  time: Timestamp<number>;
  status: Status;
  user: User;
  listing: CardListing;

}