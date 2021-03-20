import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosPageRoutingModule } from './pos-routing.module';

import { PosPage } from './pos.page';
import { HeaderModule } from '../layout/header/header.module';
import { RightSidebarModule } from '../layout/right-sidebar/right-sidebar.module';
import { ProductListComponent } from './product-list/product-list.component';
import { PriceComponent } from './price/price.component';
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
import { PriceDetailComponent } from "./price/price-detail/price-detail.component";

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
    PriceComponent,
    PaymentComponent,
    CheckoutComponent,
    BarCodeComponent,
    ProductItemComponent,
    SideCardComponent,
    TaxComponent,
    CarrierComponent,
    PriceDetailComponent,
    PopoverItemComponent,
    PopoverListComponent]

})
export class PosPageModule { }
