import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RoleList : any[] =[];
  radioSel:any;
  radioSelected:any;
  alert =false;

  signupForm = new FormGroup({
    firstName : new FormControl('',[Validators.required]),
    lastName : new FormControl('',[Validators.required]),
    userName : new FormControl('',[Validators.required]),
    emailId : new FormControl('',[Validators.required,Validators.email]),
    confirmEmailId : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required]),
    confirmPassword : new FormControl('',[Validators.required]),
    roles : new FormControl('',[Validators.required])
  })

  get f(){
    return this.signupForm.controls;
  }

  constructor(private service: DigitalBooksService,public router:Router) { }

  ngOnInit(): void {
    this.getRoleList();
  }


  getRoleList(){
    this.service.GetAllRoles().subscribe(
      response => {this.RoleList = response}
    )
  }

  SignupClick(){
    this.AddUser();
    console.log("Sign up Clicked ="+ this.f.roles.value);
  }

  AddUser(){
    var val ={
      userName : this.f.userName.value,
      emailId: this.f.emailId.value,
      password: this.f.password.value,
      roleId: this.f.roles.value,
      active: true,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value
    }

    console.log(val);

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
  this.signupForm.reset();
  }
    
  closeAlert(){
    this.alert=false;
  }



}
