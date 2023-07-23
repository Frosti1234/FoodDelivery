import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { GlobalConstants } from 'src/app/core/constants/global-constants';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/components/confirmation-dialog.component';
import { ListService } from '../../api/list.service';

@Component({
  selector: 'bill-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BillListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource: any;
  responseMessage: string;

  constructor(
    private listService: ListService,
    private dialog: MatDialog,
    private SnackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }
  tableData() {
    this.listService.getOrders().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    }, (error: any) => {
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.SnackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any) {
    // const dialogConfog = new MatDialogConfig();
    // dialogConfog.data = {
    //   data: values
    // };
    // dialogConfog.width = "100%";
    // const dialogRef = this.dialog.open(ListDialogComponent, dialogConfog);
    // this.router.events.subscribe(() => {
    //   dialogRef.close();
    // });

  }
  handleDeleteAction(values: any) {
    const dialogConfog = new MatDialogConfig;
    dialogConfog.data = {
      message: 'delete ' + values.name + ' bill',
      confirmation: true
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfog);
    const sub = dialogRef.componentInstance.onEmistStatusChange.subscribe((response) => {
      this.deleteBill(values.id);
      dialogRef.close();
    })
  }
  deleteBill(id: any) {
    this.listService.delete(id).subscribe((response: any) => {
      this.tableData();
      this.responseMessage = response?.message;
      this.SnackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.SnackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  downloadReportAction(values: any) {
    var data = {
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      contactNumber: values.contactNumber,
      paymentMethod: values.paymentMethod,
      totalAmount: values.total.toString(),
      productDetails: values.productDetails
    }
    this.downloadFile(values.uuid, data);
  }
  downloadFile(fileName: string, data: any) {

    this.listService.getPdf(data).subscribe((response: any) => {
      saveAs(response, fileName + '.pdf');
    })
  }
}
