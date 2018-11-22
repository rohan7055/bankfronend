import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DisableControlDirective} from '../_directives/disablecontrol.directive';


@NgModule({
  imports: [
    DisableControlDirective
  ],
  exports: [
    DisableControlDirective
  ]
})
export class SharedModule { }
