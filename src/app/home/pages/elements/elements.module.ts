import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsRoutingModule } from './elements-routing.module';
import { ElementsComponent } from './elements.component';
import { ComponentsHomeModule } from '../../components/components-home.module';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ComponentsHomeModule, ElementsRoutingModule],
  declarations: [ElementsComponent],
})
export class ElementsModule {}
