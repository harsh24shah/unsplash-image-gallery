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
  private Photos: any = [];
  private buffer: any = [];
  searchQuery: '';
  private pageNo: number = 2;
  showSearch: boolean = true;
  favoriteImagesBucket: any = [];
  hasFav: boolean;
  sharePhoto: Observable<any>;
  isShareActive : boolean = false;

  constructor(private galleryServices: GalleryServices, private popupService: PopupService) { }

  shareToggle(){
    this.isShareActive = !this.isShareActive;
  }

  openShareModal(id: string, image: any) {
    this.popupService.open(id);
    this.sharePhoto = image;
  }

  closeModal(id: string) {
    this.popupService.close(id);
    this.shareToggle();
  }

  copyText(selector : string) {
    var copyText = document.getElementById(selector);
    copyText.onselect;
    document.execCommand("copy");
  }

  ngOnInit() {
    this.getRandomImages();
    this.galleryServices.currentStatus.subscribe(hasFav => this.hasFav = hasFav);
  }

  getRandomImages() {
    this.galleryServices.getRandomImagesService().subscribe((data: {}) => {
      this.Photos = data;
    });
  }

  getSearchResult(searchQuery: string) {
    this.pageNo = 2;
    this.galleryServices.getSearchedImages(searchQuery).subscribe((data: {}) => {
      if (this.Photos.length < 0) {
        this.Photos = [];
      }
      this.Photos = data;
      this.Photos = this.Photos.results
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
      this.loadMoreImages(this.pageNo, this.searchQuery);
    }
  }

  loadMoreImages(pages: number, search: string) {
    this.galleryServices.getLoadMoreImages(pages, search).subscribe((data: {}) => {
      this.buffer = data;
      if (!this.buffer.results) {
        this.Photos = this.Photos.concat(data);
      }
      else {
        this.Photos = this.Photos.concat(this.buffer.results);
      }
      this.pageNo++;
    });
  }

}
