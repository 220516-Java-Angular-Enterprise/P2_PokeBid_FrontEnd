import { Status } from './status';
import { User } from './users';
import { Timestamp } from 'rxjs';

import { Conditional } from "@angular/compiler";

export interface CardListing{
  id: string;
  user: User;
  auction_bidder: User;
  card: string;
  auction_bid: number;
  status: Status;
  condition: Conditional;
  card_description: string;
  time_end: Timestamp<number>;

}