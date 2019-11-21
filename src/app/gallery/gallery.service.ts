import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Generalparameters } from '../common/constants';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class GalleryServices {
  unsplashUrl = Generalparameters.ApiConstants.BASEURL;
  apiKey = Generalparameters.ApiConstants.APIKEY;
  photos = Generalparameters.ApiConstants.PHOTOS;
  collections = Generalparameters.ApiConstants.COLLECTIONS;
  search = Generalparameters.ApiConstants.SEARCH;
  searchQuery = Generalparameters.ApiConstants.SEARCHQEURY;
  size = Generalparameters.ApiConstants.PAGESIZE;
  oredrBy = Generalparameters.ApiConstants.ORDERBY;
  users = Generalparameters.ApiConstants.USERS;
  localStrorage = Generalparameters.ApiConstants.LOCALSTORAGE;
  private hasfav = new BehaviorSubject(0);
  currentStatus = this.hasfav.asObservable();

  constructor(private http: HttpClient) {
    const today = new Date();
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  /**
   * To get photos data
   * @param id photoid to get photo data
   */
  getImage(id: string): Observable<any> {
    const photoUrl = this.unsplashUrl + this.photos + '/' + id + this.apiKey;
    return this.http.get(photoUrl)
      .pipe(map(this.extractData));
  }

  /**
   *
   * @param username get Images array from username
   */
  getUsersImages(username: string): Observable<any> {
    const UserImagesUrl = this.unsplashUrl + this.users + '/' + username + this.photos + this.apiKey;
    return this.http.get(UserImagesUrl)
      .pipe(map(this.extractData));
  }

  /**
   * To fetch random images
   * @param orderBy to set orderby of sorting
   */
  getRandomImagesService(orderBy: string): Observable<any> {
    const randomImageUrl = this.unsplashUrl + this.photos + this.apiKey + this.size + this.oredrBy + orderBy;
    return this.http.get(randomImageUrl)
      .pipe(map(this.extractData));
  }

  /**
   * To get searched images
   * @param query search stream from input
   */
  getSearchedImages(query: string): Observable<any> {
    const searchedUrl = this.unsplashUrl + this.search + this.apiKey + this.searchQuery + query + this.size;
    return this.http.get(searchedUrl)
      .pipe(map(this.extractData));
  }

  /**
   * To get more random images on page scroll
   * @param pageNo increamental page numbers
   * @param query if searched results are there
   * @param orderBy if any orderby is there
   */
  getLoadMoreImages(pageNo: number, query: string, orderBy: string): Observable<any> {
    let loadmoreUrl: string;
    const orderByText = '&page=' + pageNo + this.oredrBy + orderBy;

    loadmoreUrl = !query ? this.unsplashUrl + this.photos + this.apiKey + this.size + orderByText
      : this.unsplashUrl + this.search + this.apiKey + this.searchQuery + query + this.size + orderByText;

    return this.http.get(loadmoreUrl)
      .pipe(map(this.extractData));
  }

  /**
   * To get collections on page scroll
   * @param pageNo increamental page numbers
   */
  getLoadMoreCollections(pageNo: string): Observable<any> {
    let loadmoreUrl: string;
    loadmoreUrl = this.unsplashUrl + this.collections + this.apiKey + this.size + '&page=' + pageNo;
    return this.http.get(loadmoreUrl)
      .pipe(map(this.extractData));
  }

  /**
   * To get latest collections on comopnent init
   */
  getCollection(): Observable<any> {
    const collectionUrl = this.unsplashUrl + this.collections + this.apiKey + this.size;
    return this.http.get(collectionUrl)
      .pipe(map(this.extractData));
  }

  /**
   * To get Details/images of collection
   * @param collectionId collection id
   */
  getCollectionDetails(collectionId: Number): Observable<any> {
    const collectionDetailUrl = this.unsplashUrl + this.collections + '/' + collectionId + this.photos + this.apiKey + this.size;
    return this.http.get(collectionDetailUrl)
      .pipe(map(this.extractData));
  }

  /**
   * TO get details like cover pic and likes and count of collection
   * @param collectionId collection id
   */
  getCollectionInfo(collectionId: Number): Observable<any> {
    const collectionInfoUrl = this.unsplashUrl + this.collections + '/' + collectionId + this.apiKey;
    return this.http.get(collectionInfoUrl)
      .pipe(map(this.extractData));
  }

  /**
   * To get Loadmore images from collection id on scroll
   * @param pageNo increamental page count
   * @param collectionId collection ids
   */
  getLoadMoreCollectionDetailImages(pageNo: string, collectionId: Number): Observable<any> {
    let loadmoreUrl: string;
    loadmoreUrl = this.unsplashUrl + this.collections + '/' + collectionId + this.photos + this.apiKey + this.size + '&page=' + pageNo;
    return this.http.get(loadmoreUrl)
      .pipe(map(this.extractData));
  }

  /**
   * To add favourite items on local storage
   * @param data data to add in localstorage
   */
  addToLocalStorage(data: any) {
    let oldItems = JSON.parse(localStorage.getItem(this.localStrorage)) || [];
    if (this.checkInStorage(data, this.localStrorage)) {
      oldItems.push(data);
    } else {
      oldItems = oldItems.filter(oldItemsFromLocal => {
        return oldItemsFromLocal.imageId !== data.imageId;
      });
    }
    localStorage.setItem(this.localStrorage, JSON.stringify(oldItems));
  }

  /**
   * TO set theme in local storage
   * @param isDarkMode light/dark
   */
  setThemeToLocalStrorage(isDarkMode: string) {
    localStorage.setItem('isDarkMode', isDarkMode);
  }

  /**
   * To get theme in local storage
   */
  getThemeFromLocalStrorage() {
    return localStorage.getItem('isDarkMode');
  }

  /**
   * will return true if image id found in local storage otherwise false
   * @param data data to check in local storage
   * @param storageKey local storage key
   */
  checkInStorage(data: any, storageKey: string) {
    const oldItems = JSON.parse(localStorage.getItem(storageKey)) || [];
    return oldItems.some(item => item.imageId === data.imageId) ? false : true;
  }

  /**
   * To get favourite items on local storage
   */
  getFromLocalStorage() {
    const temp = JSON.parse(localStorage.getItem(this.localStrorage));
    return temp.slice().reverse();
  }

  /**
   * To check local storage is empty or not
   */
  changeStatus() {
    if (localStorage.getItem(this.localStrorage) === null) {
      this.hasfav.next(0);
    } else {
      const storage = JSON.parse(localStorage.getItem(this.localStrorage)).length;
      this.hasfav.next(storage);
    }
  }

}
