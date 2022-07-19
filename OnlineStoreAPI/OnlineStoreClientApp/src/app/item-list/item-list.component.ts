import { ItemFormComponent } from './item-form/item-form.component';
import { ServicesService } from './../services/services.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { item } from './../models/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {

  dataSources!: MatTableDataSource<item>
  displayedColumns: string[] = ['name', 'description', 'price', 'stock', 'Actions'];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private services: ServicesService) { }

  ngOnInit(): void {
    this.getItems();
  }

  async getItems() {
    console.log('this gets the items from the db')
    await this.services.getAllItems().subscribe((res: item[] | undefined) => {
      this.dataSources = new MatTableDataSource(res);
    });
  }

  addItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';

    let dialogRef = this.dialog.open(ItemFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res != 0) {
        console.log('The dialog was closed but item was created');

        this._snackBar.open("Item was Created Successfully", "Close", {
          duration: 2000,
        });
        this.getItems()
      }
      else {
        console.log('The dialog was closed')
      }
    });
  }

  editItem(item: item) {
    console.log(item.name + " item to edit")

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      item: item
    }

    let dialogRef = this.dialog.open(ItemFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res != 0) {
        console.log('The dialog was closed but item was edited');

        this._snackBar.open("Item was Edited Successfully", "Close", {
          duration: 2000,
        });
        this.getItems()
      }
      else {
        console.log('The dialog was closed')
      }
    });
  }

  async deleteItem(item: item) {
    console.log(item + " item to delete")

    // need to add another popup that ask if are you sure you want to delete

    await this.services.deleteItem(item).subscribe((res: any) => {
      this._snackBar.open("Item was Deleted successfully", "Close", {
        duration: 2000,
      })
    })
  }

}
