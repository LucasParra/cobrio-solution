import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ElementsModule } from './pages/elements/elements.module';
import { ElementModule } from './pages/element/element-page.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'elements',
      },
      {
        path: 'elements',
        loadChildren: () => ElementsModule,
      },
      {
        path: 'element/:id',
        loadChildren: () => ElementModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
