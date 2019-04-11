import { Component, OnInit } from '@angular/core';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  providers: [GalleryComponent],
  selector: 'app-trending',
  templateUrl: 'trending.component.html',
  styleUrls: ['../../app/app.component.scss']
})
export class TrendingComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}
