import { Condition } from './condition';
import { Status } from './status';
import { User } from './user';
import { Timestamp } from 'rxjs';


export interface CardListing{
  id?: string;
  user?: User;
  auction_bidder: User;
  card_id: string;
  auction_bid?: number;
  status?: Status;
  condition: Condition;
  card_description?: string;
  time_end?: Date;
  imgUrl?: string;
  card_name?: string;
  buy_out_price?: number;
  pinned: boolean;
}