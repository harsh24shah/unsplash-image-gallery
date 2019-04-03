import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GalleryServices } from '../gallery/gallery.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['../../app/app.component.scss']
})

export class CollectionComponent implements OnInit, OnDestroy {
  private collections: any = [];
  private buffer: any = [];
  private pageNo: number = 2;
  private loading: boolean = true;
  private loadmore: boolean = false;

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

  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    let pos = window.innerHeight + window.scrollY;
    let max = document.body.offsetHeight;
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
