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
  private isShareActive : boolean = false;
  private openedPopupId :string;

  constructor(private galleryServices: GalleryServices, private popupService : PopupService ) { }

  ngOnInit() {
    this.showFavorites();
  }

  showFavorites() {
    this.favImages = JSON.parse(this.galleryServices.getFromLocalStorage());
    //console.log(this.favImages);
  }

  shareToggle(isShareActive : boolean){
    this.isShareActive = !this.isShareActive;
  }

  openShareModal(id: string, image: any) {
    this.sharePhoto = this.popupService.openShareModal(id,image);
    this.openedPopupId = id;
  }

  closeModal(id: string) {    
    this.isShareActive = this.popupService.closeModal(id);
  }

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.closeModal(this.openedPopupId);
    }
  }
}