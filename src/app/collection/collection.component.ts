import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GalleryServices } from '../gallery/gallery.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['../../app/app.component.scss']
})

export class CollectionComponent implements OnInit, OnDestroy {
  collections: any = [];
  private buffer: any = [];
  private pageNo = 2;
  private loading = true;
  loadmore = false;

  constructor(private collectionServices: GalleryServices) { }

  ngOnInit() {
    this.getCollections();
  }

  getCollections() {
    this.loading = true;
    this.collectionServices.getCollection().subscribe((data: {}) => {
      this.collections = data;
      this.loading = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = window.innerHeight + window.scrollY;
    const max = document.body.offsetHeight;
    if (pos >= max) {
      this.loadMoreCollections(this.pageNo);
    }
  }

  loadMoreCollections(pages: any) {
    this.loadmore = true;
    this.collectionServices.getLoadMoreCollections(pages).subscribe((data: {}) => {
      this.buffer = data;
      this.collections = this.collections.concat(data);
      this.pageNo++;
      this.loadmore = false;
    });
  }

  ngOnDestroy() {

  }

}
