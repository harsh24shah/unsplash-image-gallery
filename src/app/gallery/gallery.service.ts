import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class GalleryServices {
  unsplashUrl = 'https://api.unsplash.com';
  apiKey = '?client_id=80c4c536403e65bc0651d0b3b116904ff9da875406e68a509c2d65346b418d65'; 
  photos = '/photos';
  collections = '/collections';
  search = '/search/photos';
  searchQuery = "&query=";
  size = '&per_page=30';

  constructor(private http: HttpClient) {
    let today = new Date();
  }

  private extractData(res: Response) {
    let body = res; 
    return body || { };
  }

  /*
    used to get random photos by date
  */
  getRandomImagesService() : Observable<any>{
    //console.log(this.unsplashUrl + this.photos + this.apiKey);
    let randomImageUrl = this.unsplashUrl + this.photos + this.apiKey + this.size;
    return this.http.get(randomImageUrl)
    .pipe(map(this.extractData));   
  }

  /*
    used to get searched images from search input
  */
  getSearchedImages(query : string) : Observable<any>{ 
    let searchedUrl =  this.unsplashUrl + this.search + this.apiKey + this.searchQuery + query + this.size;
   
    return this.http.get(searchedUrl)
    .pipe(map(this.extractData));
  }

  /*
    for Loadmore images on scroll
  */
  getLoadMoreImages(pageNo : string, query : string) : Observable<any>{
    let loadmoreUrl;
    if(!query){ 
      loadmoreUrl = this.unsplashUrl + this.photos + this.apiKey + this.size + "&page=" + pageNo;
    }else{
      loadmoreUrl = this.unsplashUrl + this.search + this.apiKey + this.searchQuery + query + this.size + "&page=" + pageNo;
    }
    return this.http.get(loadmoreUrl)
    .pipe(map(this.extractData));
  }

  /*
    get latest collections on comopnent init
  */
  getCollection() : Observable<any>{   
    let CollectionUrl = this.unsplashUrl +  this.collections + this.apiKey + this.size;   
   // console.log(CollectionUrl);
    return this.http.get(CollectionUrl)
    .pipe(map(this.extractData));       
  }  

  /*
    get photos from collection id
  */
  getCollectionDetails(collectionId : Number) : Observable<any>{  
    let collectionDetailUrl = this.unsplashUrl + this.collections + "/" + collectionId + this.photos + this.apiKey + this.size; 
    console.log(collectionDetailUrl);   
    return this.http.get(collectionDetailUrl)
    .pipe(map(this.extractData));
  }

  /*
    get collection info from collection id
  */
  getCollectionInfo(collectionId : Number) : Observable<any>{
    let collectionInfoUrl =  this.unsplashUrl + this.collections + "/" + collectionId + this.apiKey;
    return this.http.get(collectionInfoUrl)
    .pipe(map(this.extractData));
  }
} 
 