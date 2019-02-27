import { Component, OnInit } from '@angular/core';
import {GalleryServices} from '../gallery/gallery.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['../../app/app.component.scss']
})
export class FavoriteComponent implements OnInit {
  private favImages : [];
  constructor(private galleryServices : GalleryServices) { }

  ngOnInit() {
    this.showFavorites();
  }

  showFavorites(){
   this.favImages = JSON.parse( this.galleryServices.getFromLocalStorage() );
    console.log(this.favImages);
  }
}