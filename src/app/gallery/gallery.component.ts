import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { GalleryServices } from './gallery.service';
import { ImageDetails } from '../models/image-detail.model';
import { PopupService } from '../popup/popup.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'gallery-grid, date-pipe',
  templateUrl: './gallery.component.html',
  styleUrls: ['../../app/app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class GalleryComponent implements OnInit {
  private photos: any = [];
  private buffer: any = [];
  private searchQuery: '';
  private pageNo: number = 2;
  private showSearch: boolean = true;
  private favoriteImagesBucket: any = [];
  private hasFav: number;
  private sharePhoto: Observable<any>;
  private isShareActive: boolean = false;
  private isSortActive: boolean = false;
  private openedPopupId: string;
  private orderBy: string = '';
  loadmore : boolean = false;
  loading : boolean = false;

  constructor(
    private galleryServices: GalleryServices,
    private popupService: PopupService) {
  }

  ngOnInit() {
    this.getRandomImages(this.orderBy);
    this.galleryServices.currentStatus.subscribe(hasFav => {
      this.hasFav = hasFav;
    });
  }

  setSort() {
    this.toggleSortBy();
    this.getRandomImages(this.orderBy);
  }

  triggerEnter(event){
    if(event.keyCode == 13) {
      this.getSearchResult(this.searchQuery);
    }
  }

  toggleSortBy() {
    this.isSortActive = !this.isSortActive;
    if (this.orderBy == "") {
      this.orderBy = "oldest";
    } else {
      this.orderBy = "";
    }
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

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.closeModal(this.openedPopupId);
    }
  }

  getRandomImages(orderBy: string) {
    this.loading = true;
    this.galleryServices.getRandomImagesService(orderBy).subscribe((data: {}) => {
      this.photos = data;
      this.loading = false;
    }); 
  }

  getSearchResult(searchQuery: string) {
    this.loading = true;
    this.pageNo = 2;
    this.galleryServices.getSearchedImages(searchQuery).subscribe((data: {}) => {
      if (this.photos.length < 0) {
        this.photos = [];
      }
      this.photos = data;
      this.photos = this.photos.results;
      this.loading = false;
    });

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
