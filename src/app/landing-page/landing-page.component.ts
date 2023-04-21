import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GalleryServices } from '../shared/services/gallery.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {



  photos: any = [];

  constructor( 
    private galleryServices: GalleryServices
  ) { }
  ngOnInit() {   
    this.getRandomImages();
  }

  getRandomImages() {
   
    this.galleryServices.getRandomImagesService('').subscribe(data => {
      if(data) {
        this.photos = [...data];
      }
  
    });
  }






}
