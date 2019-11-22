import { NgModule } from '@angular/core';
import { ElementComponent } from './element/element.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [ElementComponent],
  exports: [ElementComponent],
})
export class ComponentsHomeModule {}
