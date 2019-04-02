import { Component, OnInit, HostListener } from '@angular/core';
import { GalleryServices } from '../gallery/gallery.service';
import { PopupService } from '../popup/popup.service';
import { ImageDetails } from '../models/image-detail.model';
import { Observable } from 'rxjs';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  providers: [GalleryComponent],
  selector: 'app-trending',
  templateUrl: '../gallery/gallery.component.html',
  styleUrls: ['../../app/app.component.scss']
})
export class TrendingComponent implements OnInit {
  private photos: any = [];
  private buffer: any = [];
  private searchQuery: '';
  private pageNo: number = 2;
  private showSearch: boolean = false;
  private favoriteImagesBucket: any = [];
  private hasFav: number;
  private sharePhoto: Observable<any>;
  private isShareActive: boolean = false;
  private isSortActive: boolean = false;
  private openedPopupId: string;
  private orderBy: string = '';
  loadmore = false;
  loading = false;

  constructor(
    private galleryServices: GalleryServices,
    private popupService: PopupService,
    private galleryComponent: GalleryComponent) { }

  ngOnInit() {
    this.getRandomImages("popular");
    this.galleryServices.currentStatus.subscribe(hasFav => {
      this.hasFav = hasFav;
    });
  }

  getRandomImages(orderBy: string) {
    this.loading = true;
    this.galleryServices.getRandomImagesService(orderBy).subscribe((data: {}) => {
      this.photos = data;
      this.loading = false;
    });
  }

  shareToggle() {
    this.isShareActive = !this.isShareActive;
  }

  openShareModal(id: string, image: any) {
    this.sharePhoto = this.popupService.openShareModal(id, image);
    this.openedPopupId = id;
  }

  closeModal(id: string) {
    this.isShareActive = this.popupService.closeModal(id);
    this.openedPopupId = '';
  }

  copyText(value: string) {
    this.galleryServices.copyMessage(value);
  }

  addFavorite(photo: any) {
    var favImage = new ImageDetails;

    favImage.imageURL = photo.urls.small;
    favImage.imageDownloadPath = photo.links.download;
    favImage.imageAlt = photo.user.username;
    favImage.imageId = photo.id;
    favImage.imageOwnerProfile = photo.user.profile_image.small;
    favImage.imageOwnerName = photo.user.first_name;

    this.galleryServices.addToLocalStorage(favImage);
    this.galleryServices.changeStatus();
    favImage = null;
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    let pos = window.innerHeight + window.scrollY;
    let max = document.body.offsetHeight;
    if (pos >= max) {
      this.loadMoreImages(this.pageNo, this.searchQuery, this.orderBy);
    }
  }

  loadMoreImages(pages: number, search: string, orderBy: string) {
    this.loadmore = true;
    this.galleryServices.getLoadMoreImages(pages, search, orderBy).subscribe((data: {}) => {
      this.buffer = data;
      if (!this.buffer.results) {
        this.photos = this.photos.concat(data);
      }
      else {
        this.photos = this.photos.concat(this.buffer.results);
      }
      this.pageNo++;
    });
    this.loadmore = false;
  }
}
