import { Component, OnInit, HostListener } from '@angular/core';
import { GalleryServices } from '../gallery/gallery.service';
import { PopupService } from '../popup/popup.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['../../app/app.component.scss']
})

export class FavoriteComponent implements OnInit {
  private favImages: [];
  private sharePhoto: Observable<any>;
  private isShareActive: boolean = false;
  private openedPopupId: string;

  constructor(private galleryServices: GalleryServices, private popupService: PopupService) { }

  ngOnInit() {
    this.showFavorites();
  }

  showFavorites() {
    var temp : any;
    temp = JSON.parse(this.galleryServices.getFromLocalStorage());
    this.favImages = temp.slice().reverse();
    //console.log(this.favImages);
  }

  shareToggle() {
    this.isShareActive = !this.isShareActive;
  }

  openShareModal(id: string, image: any) {
    this.popupService.open(id);
    this.sharePhoto = image;
    this.openedPopupId = id;
  }

  closeModal(id: string) {
    this.isShareActive = this.popupService.close(id);
  }

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.closeModal(this.openedPopupId);
    }
  }
}