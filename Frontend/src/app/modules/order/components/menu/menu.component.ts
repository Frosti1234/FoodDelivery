import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
import { GlobalConstants } from 'src/app/core/constants/global-constants';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { MenuService } from '../../api/menu.service';

@Component({
  selector: 'order-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  private _mobileQueryListener: () => void;
  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  manageOrderForm: any = UntypedFormGroup;
  categories: any = [];
  products: any = [];
  price: any;
  totalAmount: number = 0;
  responseMessage: any;
  showFiller = false;
  mobileQuery: MediaQueryList;

  constructor(
    private formBulider: UntypedFormBuilder,
    private menuService: MenuService,
    private snackbarService: SnackbarService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getCategories();
    this.manageOrderForm = this.formBulider.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]]
    });
  }

  getCategories() {
    this.menuService.getFilteredCategories().subscribe((response: any) => {
      this.categories = response;
    }, (error: any) => {
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  getProductsByCategory(value: any) {
    this.manageOrderForm.patchValue({ category: value });
    this.menuService.getProductByCategory(value.id).subscribe((response: any) => {
      this.products = response;
      this.manageOrderForm.controls['price'].setValue('');
      this.manageOrderForm.controls['quantity'].setValue('');
      this.manageOrderForm.controls['total'].setValue(0);
    }, (error: any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  getProductDetails(value: any) {
    this.manageOrderForm.patchValue({ product: value });
    this.menuService.getById(value.id).subscribe((response: any) => {
      this.price = response.price;
      this.manageOrderForm.controls['price'].setValue(response.price);
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.price * 1);
    }, (error: any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  setQuantity() {
    var temp = this.manageOrderForm.controls['quantity'].value;
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    } else if (temp != '') {
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
  }

  validateProductAdd() {
    var fromData = this.manageOrderForm.value;
    var Value = this.manageOrderForm.controls['price'].value;
    if (Value === null || fromData?.product?.total === 0 || fromData?.product?.total === '' || fromData?.product?.quantity <= 0) {
      return true;
    } else {
      return false;
    }
  }

  validateSubmit() {
    var formData = this.manageOrderForm.value;
    if (this.totalAmount === 0 || formData.product.name === null || this.manageOrderForm.controls['email'].value === null ||
      formData.contactNumber === null || formData.paymentMethod === null) {
      return true;
    } else {
      return false;
    }
  }

  add() {
    var fromData = this.manageOrderForm.value;
    var productName = this.dataSource.find((e: { id: number }) => e.id === fromData.product.id);
    if (productName === undefined) {
      this.totalAmount = this.totalAmount + fromData.total;
      this.dataSource.push({ id: fromData.product.id, name: fromData.product.name, category: fromData.category.name, quantity: fromData.quantity, price: fromData.price, total: fromData.total });
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar(GlobalConstants.productAdded, "Success");
    } else {
      this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
    }
  }

  handleDeleteAction(value: any, element: any) {
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
    var formData = this.manageOrderForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount.toString(),
      productDetails: JSON.stringify(this.dataSource)
    }

    this.menuService.generateReport(data).subscribe((resonse: any) => {
      this.downloadFile(resonse?.uuid);
      this.manageOrderForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
    }, (error: any) => {
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  downloadFile(fileName: string) {
    var data = {
      uuid: fileName
    }
    this.menuService.getPdf(data).subscribe((resonse: any) => {
      saveAs(resonse, fileName + ".pdf");
    })
  }

  decreaseQuantity() {
    const quantity = this.manageOrderForm.controls['quantity'].value;
    if (quantity > 0) {
      this.manageOrderForm.controls['quantity'].setValue(quantity - 1);
    }
    this.setQuantity();
  }

  increaseQuantity() {
    let quantity = parseInt(this.manageOrderForm.controls['quantity'].value);
    this.manageOrderForm.controls['quantity'].setValue(quantity + 1);
    this.setQuantity();
  }

}

