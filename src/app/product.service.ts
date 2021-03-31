import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }


  getProductByCode(code: string) {
    console.log('code ' + code);
    return this.httpClient.get<any>('https://api.jmplus.com.tw/Product/Code?scan_code=' + code);

  }
  getProductIndexList() {
    return this.httpClient.get<any>('https://api.jmplus.com.tw/Product/GetOnlineProductNameList');
  }

  getProductBriefById(id: number) {
    return this.httpClient.get<any>('https://api.jmplus.com.tw/ProductOrder/GetProductInfo?id=' + id);
  }
}
