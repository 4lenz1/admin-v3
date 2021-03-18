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
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosPageRoutingModule,
    HeaderModule,
    RightSidebarModule,

  ],
  declarations: [PosPage, ProductListComponent,
    PriceComponent,
    PaymentComponent,
    CheckoutComponent,
    ProductItemComponent]
})
export class PosPageModule { }
