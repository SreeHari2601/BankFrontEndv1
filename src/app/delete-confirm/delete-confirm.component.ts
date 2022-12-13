import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

 @Input() item:string | undefined
 @Input() serverMsg:string | undefined

 // use eventEmitted to create an event 

 @Output() onCancel = new EventEmitter()
 @Output() onDelete = new EventEmitter()
 
constructor() { }

  ngOnInit(): void {
  }

 cancel(){
 // occurs the oncancel event here using emit()
 this.onCancel.emit()
 }

 deleteChild() {
 let deleteConfirm = true
 this.onDelete.emit([this.item,deleteConfirm])
 this.item=""
 }


}
