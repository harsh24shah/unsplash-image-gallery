import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../services/shared.service';
import { CollectionImageVM, CollectionVM } from 'src/app/models/collection.mode';
import { ImageTileComponent } from '../tiles/image-tile/image-tile.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-collection-grid',
  standalone: true,
  imports: [ImageTileComponent, MatSnackBarModule, MatDividerModule, MatIconModule, MatButtonModule, MatProgressBarModule, SkeletonLoaderComponent],
  templateUrl: './collection-grid.component.html',
  styleUrl: './collection-grid.component.scss'
})
export class CollectionGridComponent implements OnInit {
  public collection: CollectionVM;
  private currentPage = 1;
  public collectionImages: CollectionImageVM[] = [];
  private snackBar = inject(MatSnackBar);
  public isLoading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CollectionVM,
      private dialog: MatDialog,
      private sharedService: SharedService
    ){
      this.collection = data;
  }

  /**
   * Angular lifecycle hook - called after component initialization
   * Calls getCollectionData() to load initial collection data
   */
  ngOnInit(): void {
    this.getCollectionData();
  }

  /**
   * Fetches collection data from the shared service
   * Updates collectionImages array with new data
   * Shows snackbar and closes dialog if no data is found
   */
  private getCollectionData(){
    this.sharedService.getCollectionById(this.collection.id, this.currentPage.toString()).subscribe(res => {
      if (res?.length > 0) {
        this.collectionImages = [...this.collectionImages, ...res];
      } else {
        this.openSnackBar("No Data found!", "ok");
        this.close();
      }
    });
  }

  /**
   * Closes all open dialogs
   */
  public close() {
    this.dialog.closeAll();
  }

  /**
   * Displays a snackbar notification
   * @param message - The message to display
   * @param action - The action text for the snackbar
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  /**
   * Loads more images by incrementing current page
   * and fetching additional collection data
   */
  public loadMoreImages() {
     ++this.currentPage;
     this.getCollectionData();
  }
}
