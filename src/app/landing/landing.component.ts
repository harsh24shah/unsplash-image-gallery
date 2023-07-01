import { Component, OnInit } from '@angular/core';
import { GalleryServices } from '../services/gallery.service';
import { ImageDetails } from '../models/image-detail.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  photos: any = [];
  imageDetails: ImageDetails[] = [];
  constructor(
    private galleryServices: GalleryServices
  ) { }

  ngOnInit(): void {
    this.getRandomImages('');
  }

  getRandomImages(orderBy: string) {
    this.galleryServices.getRandomImagesService(orderBy).subscribe((data: {}) => {
      this.photos = data;
    });
  }

}
