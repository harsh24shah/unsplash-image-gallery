import { Component, OnInit } from '@angular/core';
import { GalleryServices } from '../gallery/gallery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['../../app/app.component.scss']
})

export class FavoriteComponent implements OnInit {
  favImages: [];
  loadmore = false;

  constructor(
    private galleryServices: GalleryServices,
    private router: Router) { }

  ngOnInit() {
    this.showFavorites();
  }

  showFavorites() {
    this.loadmore = true;
    this.favImages = this.galleryServices.getFromLocalStorage();
    this.loadmore = false;
  }

  addFavorite(photo: any) {
    this.loadmore = true;
    this.galleryServices.addToLocalStorage(photo);
    this.galleryServices.changeStatus();
    photo = null;
    this.favImages = this.galleryServices.getFromLocalStorage();
    this.favImages.length === 0 ? this.router.navigate(['/']) : this.loadmore = false;
  }
}
