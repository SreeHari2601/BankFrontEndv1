import { Component, OnInit } from '@angular/core';
import  jspdf from 'jspdf';
import 'jspdf-autotable';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {


 transaction:any;
  acno=""
  user=""
  searchKey:string="";
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")){
      this.user = localStorage.getItem("username") || ''
     }
     if (localStorage.getItem("username")){
      this.acno = localStorage.getItem("currentAcno") || ''
     }
     this.api.transaction(this.acno)
     .subscribe(
      (result:any)=>{
        this.transaction = result.transaction
        console.log(this.transaction); 
      },
      (result:any)=>{
        alert(result.error.message)
      }
     )

  }

  search(event:any){
    this.searchKey=event.target.value
  }

  
  generatePdf() {
    var pdf = new jspdf();

    let col = ['transaction Type','Amount']
    let row:any=[]
    pdf.setFontSize(16);
    pdf.text('Transaction History', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);


   var itemNew = this.transaction
   itemNew.forEach(element=>{
   var temp = [element.type,element.amount];
   row.push(temp)
   });

 (pdf as any).autoTable(col,row,{startY: 10})
    // (pdf as any).autoTable({
    // head: this.header,
    // body: this.tableData,
    // theme: 'plain',
    // didDrawCell: data => {
    //     console.log(data.column.index)
    // }
    // })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
}  

}
