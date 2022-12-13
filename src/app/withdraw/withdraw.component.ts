import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  emsg =""
 
  WithdrawForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })

  constructor(private fb : FormBuilder, private api :ApiService,private router:Router) { }

  ngOnInit(): void {
  }

  Withdraw() {
    if (this.WithdrawForm.valid) {
      let acno =this.WithdrawForm.value.acno 
      let pswd = this.WithdrawForm.value.pswd
      let amount =this.WithdrawForm.value.amount
       this.api.withdraw(acno,pswd,amount)
       .subscribe (
         (result:any)=>{
        console.log(result);
        alert(result.message)
        this.WithdrawForm.reset()
          //  this.router.navigateByUrl("") 
       
      },
       // response code
       (result:any)=>{
         this.emsg = "invalid - user-credentials" 
        alert(result.error.message)
        
        }
      )
    } 
    else {
     alert ("Invalid-Credentials")
    }
 }
  }

