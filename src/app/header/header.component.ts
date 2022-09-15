import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  constructor(private service:DigitalBooksService,public router:Router) {
  //  // Subscribe here, this will automatically update 
  //       // "isUserLoggedIn" whenever a change to the subject is made.
  //       this.service.isUserLoggedIn.subscribe( value => {
  //         this.isLoggedIn = value;
  //         this.ActivateSignupComp =value;
  //     });

  //     console.log("ActivateSignupComp =" +this.ActivateSignupComp);
  //     console.log("isLoggedIn =" +this.isLoggedIn);
   }
   alert:boolean=false;
   isLoggedIn = false;
   UserName:string="";
  ModalTitle:string="";
  ActivateSignupComp :boolean=false;

  userLoggedIn :boolean =false;
  showSignInSignUp : boolean = true;

  display = "none";
  SignupModaldisplay ="none";
  openModal() {
    this.ModalTitle ="Sign Up";
    this.SignupModaldisplay = "block";
    this.display = "none";
  }

  openSignInModal() {
    this.ModalTitle ="Sign In";
    this.display = "block";
    this.SignupModaldisplay = "none";
  }
  onCloseHandled() {
    this.display = "none";
    this.SignupModaldisplay = "none";
  }

  ngOnInit(): void {
    this.userLoggedIn = this.service.CheckUserLoggedInOrNot();
    //  this.isUserLoggedIn(this.userLoggedIn);
    this.isLoggedIn = this.userLoggedIn;
    this.getUserNameAndRole();
     console.log("in ngonInit =" + this.userLoggedIn);
  }

  signOutClick() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // this.isUserLoggedIn(false);

    this.router.navigate(['/signin'])
  } 

  // isUserLoggedIn(loggedIn:boolean){
  //   if(loggedIn){
  //     this.showSignInSignUp =false;
  //     this.alert=true;
  //   }
  //   else{
  //     this.showSignInSignUp =true;
  //     this.alert=false;
  //   }
    
  //   console.log("showSignInSignUp =" + this.showSignInSignUp);
  //   console.log("loggedIn =" + loggedIn);
  // }

  getUserNameAndRole(){
   console.log(localStorage.getItem('user'));
   let user = JSON.parse(localStorage.getItem('user') || '');
   this.UserName = user.userName;
  }

  closeAlert(){
    this.alert=false;
  }

  isUserLoggedIn(){
    
    // return localStorage.getItem("token");
    if(localStorage.getItem("token"))
    {
      this.getUserNameAndRole();
      return true;
    }
    return false;
  }


}
