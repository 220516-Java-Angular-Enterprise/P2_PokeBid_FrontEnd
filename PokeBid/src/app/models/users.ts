import { Pinned } from './pinned';
import { CardListing } from './cardListing';
import {Review} from "./review";

export interface User{
  id: string;
  username: string;
  password: string;
  adress: string;
  role: string;
  email: string;
  reviews?: Review[];
  pinned?: Pinned[]; 
  history?: History[];
  listings?: CardListing[]; 
  
}