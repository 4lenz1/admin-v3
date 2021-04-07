import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosPageRoutingModule } from './pos-routing.module';

import { PosPage } from './pos.page';
import { HeaderModule } from '../layout/header/header.module';
import { RightSidebarModule } from '../layout/right-sidebar/right-sidebar.module';
import { ProductListComponent } from './product-list/product-list.component';
import { TotalPriceComponent } from './price/total-price.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { BarCodeComponent } from './bar-code/bar-code.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SideCardComponent } from './UI/side-card/side-card.component';
import { TaxComponent } from './tax/tax.component';
import { CarrierComponent } from './carrier/carrier.component';
import { PopoverListComponent } from './popover-list/popover-list.component';
import { PopoverItemComponent } from './popover-list/popover-item/popover-item.component';
import { PriceDetailComponent } from './price/price-detail/price-detail.component';
import { InputModalComponent } from './UI/input-modal/input-modal.component';
import { PriceCalculatorComponent } from './price/price-calculator/price-calculator.component';
import { ProductSelectModalComponent } from '../shared/UI/product-select-modal/product-select-modal.component';
import { ProductSelectItemComponent } from '../shared/UI/product-select-modal/product-select-item/product-select-item.component';
import { ProductSelectListComponent } from '../shared/UI/product-select-modal/product-select-list/product-select-list.component';
import { CamScannerModalComponent } from "./UI/cam-scanner-modal/cam-scanner-modal.component";
import { PaymentModalComponent } from "./payment/payment-modal/payment-modal.component";
import { PaymentRemitComponent } from "./payment/payment-modal/payment-remit/payment-remit.component";
import { PaymentRemitItemComponent } from "./payment/payment-modal/payment-remit/payment-remit-item/payment-remit-item.component";
import { PaymentItemComponent } from "./payment/payment-modal/payment-item/payment-item.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosPageRoutingModule,
    HeaderModule,
    RightSidebarModule,
    ZXingScannerModule
  ],
  providers: [ZXingScannerModule],
  entryComponents: [PopoverListComponent],
  declarations: [PosPage, ProductListComponent,
    TotalPriceComponent,
    PaymentComponent,
    CheckoutComponent,
    BarCodeComponent,
    ProductItemComponent,
    SideCardComponent,
    TaxComponent,
    CarrierComponent,
    PriceDetailComponent,
    PopoverItemComponent,
    PopoverListComponent,
    InputModalComponent,
    PriceCalculatorComponent,
    ProductSelectModalComponent,
    ProductSelectItemComponent,
    ProductSelectListComponent,
    CamScannerModalComponent,
    PaymentModalComponent,
    PaymentRemitComponent,
    PaymentRemitItemComponent,
    PaymentItemComponent
  ]

})
export class PosPageModule { }
