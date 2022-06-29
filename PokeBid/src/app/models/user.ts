import { Pinned } from './pinned';
import { CardListing } from './cardListing';
import {Review} from "./review";

export class User{
  id: string = "";
  username: string= "";
  password: string= "";
  address: string= "";
  role?: string;
  email?: string;
  reviews?: Review[];
  pinned?: Pinned[]; 
  history?: History[];
  listings?: CardListing[]; 
  
  constructor(){}

}