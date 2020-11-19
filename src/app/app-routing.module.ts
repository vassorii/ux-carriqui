import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferComponent } from './components/transfer/transfer.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [ {
  path: '',
  component: HomeComponent,
  children: [ {
    path: 'transfer',
    component: TransferComponent
  } ]
} ];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
