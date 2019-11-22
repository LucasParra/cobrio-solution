import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent {
  @Input() item: any = {};
  constructor(private router: Router) {}
  getKeys(node) {
    return typeof node === 'object' ? Object.keys(node) : [''];
  }
  detailsItem(elementId) {
    this.router.navigate([`/element/${elementId}`]);
  }
}
