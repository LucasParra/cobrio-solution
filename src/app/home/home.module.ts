import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ComponentsHomeModule } from './components/components-home.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ComponentsHomeModule, HomeRoutingModule],
})
export class HomeModule {}
