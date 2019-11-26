import { Component, OnInit, HostListener, ViewEncapsulation, Input } from '@angular/core';
import { GalleryServices } from './gallery.service';
import { ActivatedRoute } from '@angular/router';
import { ImageDetails } from '../models/image-detail.model';
import { PopupService } from '../popup/popup.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gallery-grid',
  templateUrl: './gallery.component.html',
  styleUrls: ['../../app/app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class GalleryComponent implements OnInit {
  @Input() orderBy = '';
  @Input() id: number;
  @Input() showCollectionTitle = false;
  @Input() showSearch = false;
  @Input() isHomePage = false;
  @Input() isCollectionDetailPage = false;
  @Input() isTrendingPage = false;
  private isEditEnabled = false;
  photos: any = [];
  hidebutton = [];
  private buffer: any = [];
  private collection: any = [];
  private pageTitle: string;
  private searchQuery: '';
  private pageNo = 2;
  private hasFav: number;
  private openedPopupId: string;
  private isSortActive = false;
  loadmore = false;
  loading = false;
  sharePhoto: Observable<any>;
  userImages: Observable<any>;
  imageDetail = true;
  pos: number;
  max: number;

  constructor(
    private route: ActivatedRoute,
    private galleryServices: GalleryServices,
    private popupService: PopupService) {
  }

  ngOnInit() {
    if (this.isHomePage || this.isTrendingPage) {
      this.getRandomImages(this.orderBy);
    } else if (this.isCollectionDetailPage) {
      this.id = +this.route.snapshot.params['id'];
      this.getCollectionPhotos(this.id);
    }

    this.galleryServices.currentStatus.subscribe(hasFav => {
      this.hasFav = hasFav;
    });
  }

  setSort() {
    this.toggleSortBy();
    this.getRandomImages(this.orderBy);
  }

  triggerEnter(event: any) {
    if (event.keyCode === 13) {
      this.getSearchResult(this.searchQuery);
    }
  }

  toggleSortBy() {
    this.isSortActive = !this.isSortActive;
    this.orderBy = this.orderBy === '' ? 'oldest' : '';
  }

  openShareModal(id: string, imageDetail: boolean, image: any) {
    this.sharePhoto = image;
    this.imageDetail = imageDetail;
    this.imageDetail ? this.isEditEnabled = false : this.isEditEnabled = true;
    this.getUsersPhotos(image);
    this.openedPopupId = id;
    this.popupService.open(id);
  }

  getUsersPhotos(sharePhoto: any) {
    this.galleryServices.getUsersImages(sharePhoto.user.username).subscribe((data: any) => {
      this.userImages = data;
    });
  }

  getCollectionPhotos(collectionId: number) {
    this.loading = true;
    // this will fetch collection photos and other details
    this.galleryServices.getCollectionDetails(collectionId).subscribe((data: {}) => {
      this.photos = data;
      this.loading = false;
    });

    // this will fetch collection info but not photos i.e collection name, number of pics etc
    this.galleryServices.getCollectionInfo(collectionId).subscribe((data: {}) => {
      this.collection = data;
      this.pageTitle = this.collection.title;
      this.loading = false;
    });
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

    if (this.collection) {
      this.pageTitle = searchQuery;
    }
  }

  addFavorite(photo: any) {
    this.hidebutton[photo.id] = true;
    let favImage = new ImageDetails;
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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.pos = window.scrollY + window.innerHeight;
    this.max = document.body.offsetHeight + 60;

    if (this.isHomePage || this.isTrendingPage) {
      if (this.pos === this.max) {
        this.loadMoreImages(this.pageNo, this.searchQuery, this.orderBy);
      }
    } else if (this.isCollectionDetailPage) {
      if (this.pos === this.max) {
        this.loadMoreCollections(this.pageNo, this.id);
      }
    }
  }

  loadmoreContent() {
    if (this.isHomePage || this.isTrendingPage) {
      this.loadMoreImages(this.pageNo, this.searchQuery, this.orderBy);
    } else if (this.isCollectionDetailPage) {
      this.loadMoreCollections(this.pageNo, this.id);
    }
  }

  loadMoreImages(pages: number, search: string, orderBy: string) {
    this.loadmore = true;
    this.galleryServices.getLoadMoreImages(pages, search, orderBy).subscribe((data: {}) => {
      this.buffer = data;
      this.photos = !this.buffer.results ? this.photos.concat(data) : this.photos = this.photos.concat(this.buffer.results);
      this.pageNo++;
      this.loadmore = false;
    });
  }

  loadMoreCollections(pages: any, id: number) {
    this.loadmore = true;
    this.galleryServices.getLoadMoreCollectionDetailImages(pages, id).subscribe((data: {}) => {
      this.buffer = data;
      this.photos = this.photos.concat(data);
      this.pageNo++;
      this.loadmore = false;
    });
  }
}
