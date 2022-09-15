import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  alert:boolean=false;
  searchResult: any;
  ModalTitle:string="";
  display = "none";
  userID : string ='';
  isTesting : boolean =true;
  book : any;
  constructor(private service:DigitalBooksService, public router:Router) { }

  ngOnInit(): void {
    this.service.CheckUserLoggedInOrNot();
    this.GetUserID();
    this.loadBooks();    
    }

  GetUserID(){
    let values = JSON.parse(localStorage.getItem("user") || '');
    this.userID = values.userId;
    let headerComponentObj = new HeaderComponent(this.service,this.router);
    headerComponentObj.ngOnInit();
  }
  
  loadBooks(){
    this.service.SearchBooks('0',this.userID,0).subscribe(
      response => {this.searchResult = response; console.log(this.searchResult);}
    );
    }

    openModal() {
      this.ModalTitle ="Add Book";
      this.display = "block";
    }
  
    onCloseHandled() {
      this.display = "none";
    }

    activeInactiveClick(item:any){
      this.book =item; 
      this.book.active = !item.active;
      console.log("item Value =" + JSON.stringify(item));
      console.log(this.book);
      this.service.UpdateBookStatus(this.book.bookId,this.userID,this.book.active).subscribe(
        response => { this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000);} //alert will disappear after 4 sec
        // alert('Status updated Successfully.'); 
      )
    }

    closeAlert(){
      this.alert=false;
    }
  
}
