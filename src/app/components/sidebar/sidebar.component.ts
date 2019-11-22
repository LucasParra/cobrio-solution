import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  items = ['Making Plan', 'Dashboard', 'My Ads', 'Analytics', 'Cobrio &reg; Store'];
}
