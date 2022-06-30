import { User } from 'src/app/models/user';
import { Status } from './../status';
export interface HistoryRequest{
  status_id: string;
  user_id?: string;
  listing_id?: string;
}