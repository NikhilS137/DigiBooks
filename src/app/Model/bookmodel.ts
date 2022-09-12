export interface Book {
    bookId: number;
    bookName : string;
    categoryId : number;
    price : number;
    publisher : string;
    userId : number;
    publishedDate : Date,
    bookContent : string,
    active : boolean
}