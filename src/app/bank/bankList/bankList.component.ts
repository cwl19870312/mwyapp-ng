import { Component, OnInit } from '@angular/core';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'component-bankList',
  templateUrl: './bankList.component.html',
  styleUrls: ['./bankList.component.css']
})
export class BankListComponent implements OnInit {
  bankList;
  next;

  constructor(private _bankService: BankService) { }

  ngOnInit() {
    this.getBankList();
  }

  getBankList(){
    this._bankService.getNext().subscribe((data)=>{
      this.bankList = data.list;
      this.next = data.next;
    })
  }

}
