import { Component, OnInit, signal } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ImageVM } from 'src/app/models/image.model';
import { CollectionVM } from 'src/app/models/collection.mode';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public images = signal<ImageVM[]>([]);
  public collections = signal<CollectionVM[]>([]);
  public imagePlaceholders = Array.from({ length: 8 });
  public collectionPlaceholders = Array.from({ length: 10 });
  public imagePageNumber = 1;
  public collectionPageNumber = 1;
  public value = '';
  public remainigCounts = 0;
  public isLoadingImages = signal(false);
  public isLoadingCollections = signal(false);
  public hasMoreImages = signal(true);
  public hasMoreCollections = signal(true);

  constructor(
    private sharedService: SharedService
  ) {}

  /**
   * Angular lifecycle hook - called after component initialization
   * Initializes the page by calling initializePage()
   */
  ngOnInit() {
    this.initializePage();
  }

  /**
   * Initializes the page by fetching initial data
   * Calls fetchInitialData() to load images and collections
   */
  private initializePage() {
    this.fetchInitialData();
  }

  /**
   * Loads more images with pagination
   * @param orderBy - Sorting criteria for images
   * Handles both regular loading and search results
   */
  public loadMoreImages(orderBy: string) {
    if (this.isLoadingImages() || !this.hasMoreImages() || (this.value !== '' && this.value.length <= 3)) return;
    this.imagePageNumber++;
    if(this.value !== '') {
      this.search(this.imagePageNumber);
    } else {
      this.getMoreImages(orderBy);
    }
  }

  /**
   * Fetches additional images from the API
   * @param orderBy - Sorting criteria for images
   * Updates the images array with new results
   */
  public getMoreImages(orderBy: string) {
    if (this.isLoadingImages() || !this.hasMoreImages()) return;
    this.isLoadingImages.set(true);
    this.sharedService.getImages(this.imagePageNumber.toString(), orderBy)
    .pipe(finalize(() => this.isLoadingImages.set(false)))
    .subscribe((data) => {
      const newImages = data;
      this.images.update(images => [...images, ...newImages]);
      this.hasMoreImages.set(newImages.length > 0);
    });
  }

  /**
   * Fetches additional collections from the API
   * @param orderBy - Sorting criteria for collections
   * Updates the collections array with new results
   */
  public getMoreCollections(orderBy: string) {
    if (this.isLoadingCollections() || !this.hasMoreCollections()) return;
    this.isLoadingCollections.set(true);
    this.collectionPageNumber++;
    this.sharedService.getCollections(this.collectionPageNumber.toString(), orderBy)
      .pipe(finalize(() => this.isLoadingCollections.set(false)))
      .subscribe((data) => {
        const newCollections = data;
        this.collections.update(collections => [...collections, ...newCollections]);
        this.hasMoreCollections.set(newCollections.length > 0);
      });
  }

  /**
   * Performs search for images based on user input
   * @param imagePageNumber - Page number for paginated results
   * Only triggers if search term is longer than 3 characters
   * Updates images array and remaining counts
   */
  public search(imagePageNumber: number) {
    if(this.value.length > 3) {
      if (this.isLoadingImages()) return;
      this.isLoadingImages.set(true);
      this.imagePageNumber = imagePageNumber;
      if(imagePageNumber === 1) {
        this.images.set([]);
        this.hasMoreImages.set(true);
      }
      this.sharedService.getSearch(this.value, this.imagePageNumber.toString(), '')
        .pipe(finalize(() => this.isLoadingImages.set(false)))
        .subscribe((data) => {
        const newImages = data.results;
        this.images.update(images => [...images, ...newImages]);
        this.remainigCounts = data.total === 0 ? 0 : (data.total - newImages.length);
        this.hasMoreImages.set(this.imagePageNumber < data.total_pages && newImages.length > 0);
      });
    }
  }

  /**
   * Clears current search results
   * Resets search term, page number and images array
   * Loads default images after clearing
   */
  public clearSearch() {
    this.value = '';
    this.imagePageNumber = 1;
    this.images.set([]);
    this.hasMoreImages.set(true);
    this.getMoreImages('');
  }

  /**
   * Fetches initial data for the page
   * Uses forkJoin to load images and collections simultaneously
   * Updates both images and collections arrays
   */
  private fetchInitialData() {
    this.isLoadingImages.set(true);
    this.isLoadingCollections.set(true);
    forkJoin([
      this.sharedService.getImages(),
      this.sharedService.getCollections()
    ]).pipe(finalize(() => {
      this.isLoadingImages.set(false);
      this.isLoadingCollections.set(false);
    })).subscribe((res) => {
      if(res[0].length > 0) { this.images.set(res[0]); }
      if(res[1].length > 0) { this.collections.set(res[1]); }
      this.hasMoreImages.set(res[0].length > 0);
      this.hasMoreCollections.set(res[1].length > 0);
    });
  }
}
