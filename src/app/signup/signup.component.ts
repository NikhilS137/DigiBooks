import { Component, OnInit } from '@angular/core';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  alert:boolean=false;
  RoleList : any[] =[];
  radioSel:any;
  radioSelected:any;

  firstName :string="";
  lastName : string ="";
  userName : string ="";
  emailID : string = "";
  password : string = "";
  roleId : number =0;


  constructor(private service: DigitalBooksService) { }

  ngOnInit(): void {
    this.getRoleList();
  }


  getRoleList(){
    this.service.GetAllRoles().subscribe(
      response => {this.RoleList = response}
    )
  }

  getSelecteditem(){
    this.radioSelected = this.RoleList.find(Item => Item.value === this.radioSelected);
  }

  AddUser(){
    var val ={
      userName : this.userName,
      emailId: this.emailID,
      password: this.password,
      roleId: this.radioSelected,
      active: true,
      firstName: this.firstName,
      lastName: this.lastName
    }

    this.service.AddUser(val).subscribe(
      response => { //alert('User Added Successfully.');
        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec
       this.clearControls();}
      
    )
  }

  clearControls(){
   this.userName ="",
   this.emailID ="",
   this.password = "",
   this.radioSelected ="",   
   this.firstName = "",
   this.lastName =""
  }
    
  closeAlert(){
    this.alert=false;
  }


}
