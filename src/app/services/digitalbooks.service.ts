import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../Model/bookmodel';
import { purchase } from '../Model/purchasemodel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DigitalBooksService {

    baseUrl = 'https://localhost:7271/';

    // public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    constructor(private https: HttpClient,public router:Router) {}

    //Get All Categories
    GetAllCategory():Observable<any[]>{
        return this.https.get<any>(this.baseUrl+"CategoryMasters/CategoryList");
    }

    //Get All Author List
    GetAllAuthors():Observable<any[]>{
        return this.https.get<any>(this.baseUrl + "UserMasters/AuthorList");
    }

    //Get All Role List
    GetAllRoles():Observable<any[]>{
        return this.https.get<any>(this.baseUrl + "Roles/RolesList");
    }

    // Save / Add new User
    AddUser(val:any):Observable<any[]>{
        return this.https.post<any>(this.baseUrl + "UserMasters/AddUser",val);
    }

    // Login WebAPI
    Login(val:any):Observable<any[]>{
        return this.https.post<any>(this.baseUrl + "Login",val)
    }

    // Search books
    SearchBooks(c:string, aID:string, p: number ):Observable<any[]>{
        return this.https.get<any>(this.baseUrl +"SearchBooks/"+ c+"/"+aID+"/"+p);
    }

    //Check User Logged in or not
    CheckUserLoggedInOrNot():boolean{
        if (localStorage.getItem('token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to sign page with the return url
         this.router.navigate(['/searchbooks']);     
        return false;
    }

    // Save book
    SaveBook(book : Book):Observable<Book>{
        return this.https.post<Book>(this.baseUrl + "Book/AddBook",book);
    }

    // Purchase 
    PurchaseBook(purchases : purchase):Observable<purchase>{
        return this.https.post<purchase>(this.baseUrl + "Purchases/buybook",purchases);
    }

    //Book History
    GetBookHistory(emailId :string):Observable<any>{
        return this.https.get<any>(this.baseUrl +"Purchases/BookHistory/"+emailId);
    }

    //Get Book List For Reader
    GetBookListReader(emailId :string):Observable<any>{
        return this.https.get<any>(this.baseUrl +"GetBooksWithStatus/"+emailId);
    }

    //To Update the book Status
    UpdateBookStatus(bookID:string,userID:string,status:boolean):Observable<any>{
        return this.https.put<any>(this.baseUrl +"UpdateBookStatus/"+bookID+"/"+userID+"/"+status,"");
    }
}