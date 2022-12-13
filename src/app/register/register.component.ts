import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })

  constructor(private fb:FormBuilder,private api:ApiService,private router : Router) { }
  emsg = ""
  ngOnInit(): void {

  }

register(){
  

  if (this.registerForm.valid) {
     let acno =this.registerForm.value.acno 
     let pswd = this.registerForm.value.pswd
     let uname =this.registerForm.value.username
     this.api.register(acno,pswd,uname)
     .subscribe (
       (result:any)=>{
       console.log(result);
       alert(result.message)
          this.router.navigateByUrl("") 
      
     },
      // response code
      (result:any)=>{
        this.emsg = "user Already exists"
       // alert(result.error.message)
       }
     )
   } 
   else {
    alert ("Invalid-Credentials")
   }
}

}
