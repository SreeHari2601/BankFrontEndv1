import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
 
  emsg = ""

  DepositForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })
  constructor(private fb : FormBuilder , private api : ApiService ) { }


  ngOnInit(): void {
    
  }

  Deposit () {
    if (this.DepositForm.valid) {
      let acno =this.DepositForm.value.acno 
      let pswd = this.DepositForm.value.pswd
      let amount =this.DepositForm.value.amount
      this.api.deposit(acno,pswd,amount)
      .subscribe (
        (result:any)=>{
        console.log(result);
        alert(result.message)
        this.DepositForm.reset()
          //  this.router.navigateByUrl("") 
       
      },
       // response code
       (result:any)=>{
         this.emsg = "Invalid-Credentials please deposit to your own account "
        // alert(result.error.message)
        }
      )
    } 
    else {
     alert ("Invalid-Credentials")
    }
 }
  }


