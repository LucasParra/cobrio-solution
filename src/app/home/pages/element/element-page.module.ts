import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementRoutingModule } from './element-page-routing.module';
import { ElementComponentPage } from './element-page.component';

import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [ElementComponentPage],
  imports: [CommonModule, ElementRoutingModule, NgxJsonViewerModule],
})
export class ElementModule {}
