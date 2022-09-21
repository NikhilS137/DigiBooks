import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorComponent } from '../author/author.component';
import { Book } from '../Model/bookmodel';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  alert:boolean=false;
  CategoryList:any[] =[];
  books:Book[] = [];
  book : Book = {
    bookId: 0,
    bookName : '',
    categoryId : 0,
    price : 0,
    publisher : '',
    userId : 0,
    publishedDate : new Date(),
    bookContent : '',
    active : true
  }

  GetUserID(){
    let values = JSON.parse(localStorage.getItem("user") || '');
    this.book.userId = values.userId;
  }

  onSelected(value:string): void {
		this.book.categoryId = Number.parseInt(value);
	}

  constructor(private service: DigitalBooksService,public router:Router) { }

  ngOnInit(): void {
    this.GetUserID();
    this.loadCategoryList();
  }

  loadCategoryList() {
    this.service.GetAllCategory()
    .subscribe(
      response => { this.CategoryList = response}
    );
  }

  onSubmitClick(){
    this.service.SaveBook(this.book).subscribe(
      response => { 
        // alert('Book Added Successfully');
        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec
        this.router.navigate(['/author']).then(() => {
          window.location.reload();
        });     
    }
    );
  }

  
  closeAlert(){
    this.alert=false;
  }


}
