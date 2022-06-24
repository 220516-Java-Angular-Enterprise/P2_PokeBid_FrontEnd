import { Timestamp } from 'rxjs';

export interface CardListingRequest{
  lister_id: string;
  card_id: string;
  auction_bid: number;
  status_id: string;
  condition_id: string;
  description: string;
  endTime: Timestamp<Number>;
}