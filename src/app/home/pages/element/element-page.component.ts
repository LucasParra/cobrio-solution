import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-element-page',
  templateUrl: './element-page.component.html',
  styleUrls: ['./element-page.component.scss'],
})
export class ElementComponentPage implements OnInit {
  constructor(
    private routeParam: ActivatedRoute,
    private router: Router,
    private mainService: MainService,
  ) {}
  id: string;
  data: any;
  ngOnInit() {
    document.querySelector('.home-route').scrollTop = 0;
    this.id = this.routeParam.snapshot.paramMap.get('id');
    this.mainService.getElements(this.id).subscribe(data => (this.data = data), console.error);
  }
  goSeeAllItems() {
    this.router.navigate(['/elements']);
  }
}
