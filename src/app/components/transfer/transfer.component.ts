import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { abi } from '../../../../build/contracts/Purchase.json';
import Web3 from 'web3';
import has = Reflect.has;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component( {
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: [ './transfer.component.scss' ]
} )
export class TransferComponent implements OnInit {

  // @ts-ignore
  private web3: Web3.providers.HttpProvider;
  private tokenABI: [];
  public account: string;
  public from: string;
  public fromVal: string;
  public to: string;
  public group: FormGroup;

  constructor( private form: FormBuilder ) {
    this.web3 = new Web3( new Web3.providers.HttpProvider( 'http://localhost:8545' ) );
  }

  ngOnInit(): void {

    this.group = this.form.group( {
      account: [ { value: '' }, [ Validators.required ] ]
    } );

    this.tokenABI = abi;
  }

  public connectToContract(): void {

  }

  public obtainBalance(): void {
    this.web3.eth.getAccounts().then( result => {
      result.forEach( item => {
        console.log( item );
      } );
    } );
  }

  public getBalance(): void {
    this.web3.eth.getBalance( this.account ).then( res => {
      console.log( this.web3.utils.fromWei( res, 'ether' ) );
    } );
  }

  public sendTransaction(): void {
    this.web3.eth.sendTransaction( {
      from: this.from,
      to: this.to,
      value: this.web3.utils.toWei( this.fromVal, 'ether' )
    } )
      .on( 'transactionHash', hash => {
        console.log( 'HASH->', hash );
      } )
      .on( 'receipt', receipt => {
        console.log( 'RECEIPT->', receipt );
      } )
      .on( 'confirmation', ( confirmationNumber, receipt ) => {
        console.log( 'CONFIRMATION->', confirmationNumber );
      } )
      .on( 'error', error => {
        console.log( 'ERROR->', error );
      } );
  }
}
