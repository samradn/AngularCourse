import { Comment } from './commmet'

export class Dish {
    id : string;
    name : string;
    image : string;
    category : string;
    featured : boolean;
    label : string;
    description : string;
    price : string;
    comments: Comment[];
    
}