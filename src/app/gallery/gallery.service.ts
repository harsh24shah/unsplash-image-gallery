import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class GalleryServices {
  apiKey = '?client_id=80c4c536403e65bc0651d0b3b116904ff9da875406e68a509c2d65346b418d65'; 
  photos = '/photos';
  collections = '/collections';
  unsplashUrl = 'https://api.unsplash.com';
  search = '/search/photos';
  searchQuery = "&query="
  size = '&per_page=10';

  constructor(private http: HttpClient) {
    let today = new Date();
  }

  private extractData(res: Response) {
    let body = res; 
    return body || { };
  }

  getRandomImagesService() : Observable<any>{
    //console.log(this.unsplashUrl + this.photos + this.apiKey);
    let randomImageUrl = this.unsplashUrl + this.photos + this.apiKey + this.size;
    return this.http.get(randomImageUrl)
    .pipe(map(this.extractData));   
  }
  
  getCollectionService() : Observable<any>{   
    let CollectionUrl = this.unsplashUrl +  this.collections + this.apiKey;   
    return this.http.get(CollectionUrl)
    .pipe(map(this.extractData));       
  }  

  getSearchedImages(query : string) : Observable<any>{ 
    let searchedUrl =  this.unsplashUrl + this.search + this.apiKey + this.searchQuery + query + this.size;
   
    return this.http.get(searchedUrl)
    .pipe(map(this.extractData));
  }

  getLoadMoreImages(pageNo : string, query : string) : Observable<any>{
    let loadmoreUrl;
    if(!query){ 
      loadmoreUrl = this.unsplashUrl + this.photos + this.apiKey + this.size + "&page=" + pageNo;
    }else{
      loadmoreUrl = this.unsplashUrl + this.search + this.apiKey + this.searchQuery + query + this.size + "&page=" + pageNo;
    }
    console.log(loadmoreUrl);
    return this.http.get(loadmoreUrl)
    .pipe(map(this.extractData));
  }
} 
 