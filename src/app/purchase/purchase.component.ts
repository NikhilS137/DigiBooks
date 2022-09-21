import { Component, Input, OnInit } from '@angular/core';
import { purchase } from '../Model/purchasemodel';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  @Input() book:any;
  @Input() bookID:any;
 
  alert:boolean=false;
  bookHistoryList : any =[];
  display = "none";
  bookDetails : any;

  objpurchase : purchase={
    PurchaseId: 0,
    EmailId : '',
    BookId : 0,
    PaymentMode : 'Card',
    IsRefunded : 'Y'
  }
  constructor(private services: DigitalBooksService) { }

  ngOnInit(): void {    
  }
  func(){
    this.bookDetails = this.book;
    return true;
  }

  loadBookHistory(){
    
    this.services.GetBookHistory(this.objpurchase.EmailId).subscribe(
      response => {this.bookHistoryList = response;
        this.display = "block";
      }
    )
  }

  onSubmit(){
    this.objpurchase.BookId = this.bookID;
    this.services.PurchaseBook(this.objpurchase).subscribe(
      response => { 
        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec
        // alert("Book Purchased Successfully.");
      this.loadBookHistory(); }
    )
  }
  onFocusOutEvent(event: any){
    this.loadBookHistory();
 }

 closeAlert(){
  this.alert=false;
}
 
}
