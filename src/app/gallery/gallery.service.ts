import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//80c4c536403e65bc0651d0b3b116904ff9da875406e68a509c2d65346b418d65
@Injectable()
export class GalleryServices {
  unsplashUrl = 'https://api.unsplash.com';
  apiKey = '?client_id=061c51148e8b602c992064482ba158499083625ae7139aee5d6bda6e2c895c96';
  photos = '/photos';
  collections = '/collections';
  search = '/search/photos';
  searchQuery = "&query=";
  size = '&per_page=30';
  oredrBy = "&order_by=";
  localStrorage = "favImages";
  private hasfav = new BehaviorSubject(0);
  currentStatus = this.hasfav.asObservable();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    let today = new Date();
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /*
    used to get random photos by date
  */
  getRandomImagesService(orderBy: string): Observable<any> {
    let randomImageUrl = this.unsplashUrl + this.photos + this.apiKey + this.size + this.oredrBy + orderBy;
    return this.http.get(randomImageUrl)
      .pipe(map(this.extractData));
  }

  /*
    used to get searched images from search input
  */
  getSearchedImages(query: string): Observable<any> {
    let searchedUrl = this.unsplashUrl + this.search + this.apiKey + this.searchQuery + query + this.size;
    return this.http.get(searchedUrl)
      .pipe(map(this.extractData));
  }

  /*
    for Loadmore images on scroll
  */
  getLoadMoreImages(pageNo: number, query: string, orderBy: string): Observable<any> {
    let loadmoreUrl: string;
    if (!query) {
      loadmoreUrl = this.unsplashUrl + this.photos + this.apiKey + this.size + "&page=" + pageNo + this.oredrBy + orderBy;
    } else {
      loadmoreUrl = this.unsplashUrl + this.search + this.apiKey + this.searchQuery + query + this.size + "&page=" + pageNo + this.oredrBy + orderBy;
    }
    return this.http.get(loadmoreUrl)
      .pipe(map(this.extractData));
  }

  /*
    for Loadmore collections on scroll
  */
  getLoadMoreCollections(pageNo: string): Observable<any> {
    let loadmoreUrl: string;
    loadmoreUrl = this.unsplashUrl + this.collections + this.apiKey + this.size + "&page=" + pageNo;
    return this.http.get(loadmoreUrl)
      .pipe(map(this.extractData));
  }

  /*
    get latest collections on comopnent init
  */
  getCollection(): Observable<any> {
    let CollectionUrl = this.unsplashUrl + this.collections + this.apiKey + this.size;
    //console.log(CollectionUrl);
    return this.http.get(CollectionUrl)
      .pipe(map(this.extractData));
  }

  /*
    get photos from collection id
  */
  getCollectionDetails(collectionId: Number): Observable<any> {
    let collectionDetailUrl = this.unsplashUrl + this.collections + "/" + collectionId + this.photos + this.apiKey + this.size;
    return this.http.get(collectionDetailUrl)
      .pipe(map(this.extractData));
  }

  /*
    get collection info on landing page from collection id
  */
  getCollectionInfo(collectionId: Number): Observable<any> {
    let collectionInfoUrl = this.unsplashUrl + this.collections + "/" + collectionId + this.apiKey;
    return this.http.get(collectionInfoUrl)
      .pipe(map(this.extractData));
  }

  /*
    for Loadmore images from collection id on scroll
  */
  getLoadMoreCollectionDetailImages(pageNo: string, collectionId: Number): Observable<any> {
    let loadmoreUrl: string;
    loadmoreUrl = this.unsplashUrl + this.collections + "/" + collectionId + this.photos + this.apiKey + this.size + "&page=" + pageNo;
    console.log(loadmoreUrl);
    return this.http.get(loadmoreUrl)
      .pipe(map(this.extractData));
  }

  /*
    Add favourite items on local storage
  */
  addToLocalStorage(data: any) {
    var oldItems = JSON.parse(localStorage.getItem(this.localStrorage)) || [];
    if (this.checkInStorage(data, this.localStrorage)) {
      oldItems.push(data);
    } else {
      oldItems = oldItems.filter(oldItems => {
        return oldItems.imageId !== data.imageId;
      });
    }
    localStorage.setItem(this.localStrorage, JSON.stringify(oldItems));
  }

  /*
    will return true if image id found in local storage otherwise false
  */
  checkInStorage(data: any, storageKey: string) {
    var oldItems = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (oldItems.some(item => item.imageId == data.imageId)) {
      return false;
    } else {
      return true;
    }
  }

  /*
    To get favourite items on local storage
  */
  getFromLocalStorage() {
    return localStorage.getItem(this.localStrorage);
  }

  /*
    To get favourite items on local storage
  */
  changeStatus() {
    if (localStorage.getItem(this.localStrorage) === null) {
      this.hasfav.next(0);
    } else {
      var storage = JSON.parse(localStorage.getItem(this.localStrorage)).length;
      this.hasfav.next(storage);
    }
  }

}
