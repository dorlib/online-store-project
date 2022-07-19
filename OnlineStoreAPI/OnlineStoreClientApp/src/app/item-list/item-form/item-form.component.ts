import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { item } from 'src/app/models/item.model'
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  newItem: item | undefined;
  isEdit: boolean = false;

  constructor(public dialogRef: MatDialogRef<ItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private services: ServicesService) { }

    newItemForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(null),
      stock: new FormControl(null)
    });

  ngOnInit(): void {
    if (this.data != null) {
      this.newItemForm = new FormGroup({
        name: new FormControl(this.data.item.name),
        description: new FormControl(this.data.item.description),
        price: new FormControl(this.data.item.price),
        stock: new FormControl(this.data.item.stock)
      });
      this.isEdit = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  async onSubmit() {
    if(this.isEdit == false){
      this.newItem = new item(0, this.newItemForm.value.name!, this.newItemForm.value.description!, this.newItemForm.value.price!, this.newItemForm.value.stock!);
      await this.services.editItem(this.newItem).subscribe((res: any) => {
        this.dialogRef.close(0);
      });
    }else{
      this.newItem = new item(this.data.item.itemID, this.newItemForm.value.name!, this.newItemForm.value.description!, this.newItemForm.value.price!, this.newItemForm.value.stock!);
      await this.services.editItem(this.newItem).subscribe((res: any) => {
        this.dialogRef.close(0);
      })
    }
  }

}
