import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module'
import { LoginComponent } from './login.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
