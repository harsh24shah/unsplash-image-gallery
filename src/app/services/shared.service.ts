import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConatants } from '../constants/constants';
import { ImageVM, SearchedResults } from '../models/image.model';
import { CollectionImageVM, CollectionVM } from '../models/collection.mode';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private httpClient: HttpClient) {}

  /**
   * To fetch random images
   */
  public getImages(page = AppConatants.DEFAULT_PAGE_NUMBER, orderBy = AppConatants.DEFAULT_ORDER_BY): Observable<ImageVM[]> {
    const url = AppConatants.RANDOM_IMAGES.replace('{pageSize}',AppConatants.DEFAULT_PAGE_SIZE).replace('{page}', page).replace('{orderBy}', orderBy);
    return this.httpClient.get<ImageVM[]>(url)
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches collections from the API
   * @param page - Page number for pagination
   * @param orderBy - Sorting criteria for collections
   * @returns Observable of CollectionVM array
   */
  public getCollections(page = AppConatants.DEFAULT_PAGE_NUMBER, orderBy = AppConatants.DEFAULT_ORDER_BY): Observable<CollectionVM[]> {
    const url = AppConatants.COLLECTIONS.replace('{pageSize}',AppConatants.DEFAULT_COLLECTION_PAGE_SIZE).replace('{page}', page).replace('{orderBy}', orderBy);
    return this.httpClient.get<CollectionVM[]>(url)
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches a collection by its ID
   * @param id - The ID of the collection
   * @param page - Page number for pagination
   * @param orderBy - Sorting criteria for collections
   * @returns Observable of CollectionImageVM array
   */
  public getCollectionById(id: string,page = AppConatants.DEFAULT_PAGE_NUMBER, orderBy = AppConatants.DEFAULT_ORDER_BY): Observable<CollectionImageVM[]> {
    const url = AppConatants.COLLECTION_BY_ID.replace('{id}', id).replace('{pageSize}',AppConatants.DEFAULT_COLLECTION_PAGE_SIZE).replace('{page}', page).replace('{orderBy}', orderBy);;
    return this.httpClient.get<CollectionImageVM[]>(url)
    .pipe(catchError(this.handleError));
  }

  /**
   * Fetches images uploaded by a specific user
   * @param username - The username of the user
   * @returns Observable of ImageVM array
   */
  public getUserImages(username: string) : Observable<ImageVM[]>{
    const url = AppConatants.IMAGES_BY_USER_ID.replace('{user_id}', username);
    return this.httpClient.get<ImageVM[]>(url)
    .pipe(catchError(this.handleError));
  }

  /**
   * Searches for images based on a query
   * @param searchQuery - The search term
   * @param page - Page number for pagination
   * @param orderBy - Sorting criteria for images
   * @returns Observable of SearchedResults
   */
  public getSearch(searchQuery: string, page = AppConatants.DEFAULT_PAGE_NUMBER, orderBy = AppConatants.DEFAULT_ORDER_BY): Observable<SearchedResults> {
    const url = AppConatants.SEARCH.replace('{pageSize}',AppConatants.DEFAULT_PAGE_SIZE).replace('{page}', page).replace('{orderBy}', orderBy).replace('{searchQuery}', searchQuery);
    return this.httpClient.get<SearchedResults>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something went wrong; please try again later.' + error.message)
    );
  }
}
