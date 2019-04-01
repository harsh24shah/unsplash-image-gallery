import { Component, OnInit, HostListener } from '@angular/core';
import { GalleryServices } from './gallery/gallery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private title = 'Wallperex';
  private hasFav: number;

  constructor(private galleryServices: GalleryServices) { }

  ngOnInit() {
    this.galleryServices.currentStatus.subscribe(hasFav => this.hasFav = hasFav);
    this.galleryServices.changeStatus();
  }

 
}
