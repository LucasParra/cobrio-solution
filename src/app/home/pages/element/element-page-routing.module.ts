import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementComponentPage } from './element-page.component';

const routes: Routes = [
  {
    path: '',
    component: ElementComponentPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementRoutingModule {}
