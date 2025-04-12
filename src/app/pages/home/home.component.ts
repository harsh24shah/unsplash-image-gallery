import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ImageVM } from 'src/app/models/image.model';
import { CollectionVM } from 'src/app/models/collection.mode';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public images: ImageVM[] = [];
  public collections: CollectionVM[] = [];
  public imagePageNumber = 1;
  public collectionPageNumber = 1;
  public value = '';
  public remainigCounts = 0;
  public isLoading = false;

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
    this.isLoading = true;
    ++this.imagePageNumber;
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
    this.sharedService.getImages(this.imagePageNumber.toString(), orderBy)
    .subscribe((data) => {
      const newImages = data;
      this.images = [...this.images, ...newImages];
      this.isLoading = false;
    });
  }

  /**
   * Fetches additional collections from the API
   * @param orderBy - Sorting criteria for collections
   * Updates the collections array with new results
   */
  public getMoreCollections(orderBy: string) {
    this.isLoading = true;
    ++this.collectionPageNumber;
    this.sharedService.getCollections(this.collectionPageNumber.toString(), orderBy)
      .subscribe((data) => {
        const newCollections = data;
        this.collections = [...this.collections, ...newCollections];
        this.isLoading = false;
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

      this.isLoading = true;
      this.imagePageNumber = imagePageNumber;

      if(imagePageNumber === 1) this.images = [];

      this.sharedService.getSearch(this.value, this.imagePageNumber.toString(), '').subscribe((data) => {
        const newImages = data.results;
        this.images = [...this.images, ...newImages];
        this.remainigCounts = data.total === 0 ? 0 : (data.total - newImages.length);
        this.isLoading = false;
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
    this.images = [];
    this.getMoreImages('');
  }

  /**
   * Fetches initial data for the page
   * Uses forkJoin to load images and collections simultaneously
   * Updates both images and collections arrays
   */
  private fetchInitialData() {
    this.isLoading = true;
    forkJoin([
      this.sharedService.getImages(),
      this.sharedService.getCollections()
    ]).subscribe((res) => {
      this.images = res[0];
      this.collections = res[1];
      this.isLoading = false;
    });
  }
}
