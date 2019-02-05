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
  collections = '/collections';
  unsplashUrl = 'https://api.unsplash.com';
  size = '&per_page=20';

  constructor(private http: HttpClient) {
    let today = new Date();
  }

  private extractData(res: Response) {
    let body = res; 
    return body || { };
  }

  getCollection() : Observable<any>{   
    let CollectionUrl = this.unsplashUrl +  this.collections + this.apiKey + this.size;   
    console.log(CollectionUrl);
    return this.http.get(CollectionUrl)
    .pipe(map(this.extractData));       
  }  
} 
 