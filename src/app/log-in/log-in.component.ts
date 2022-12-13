import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  // to hold error message
  emsg=""
  // to hold input values create variable 
   msg = ""
  loginForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })

  constructor(private fb:FormBuilder,private api : ApiService, private router : Router) { }

  ngOnInit(): void {
  }

login () {

  this.loginForm.get('acno')?.errors

 if (this.loginForm.valid) {
    let acno =this.loginForm.value.acno 
    let pswd = this.loginForm.value.pswd
    this.api.login(acno,pswd)
    .subscribe (
      (result:any)=>{
      console.log(result);
      localStorage.setItem("username",result.username)
      localStorage.setItem("token",result.token)
      localStorage.setItem("currentAcno",result.currentAcno)
      // alert(result.message)
      this.msg = result.message
      setTimeout(()=>{
        this.router.navigateByUrl("dashboard")
      },2000) 
     
    },
     // response code
     (result:any)=>{
       this.emsg = "Invalid Credentials"
      // alert(result.error.message)
     }
    )
  } 
  else {
  //  alert ("Invalid Ac number or Password")
  }

}

}
