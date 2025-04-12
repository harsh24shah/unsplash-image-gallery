import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DailogData, ImageVM } from 'src/app/models/image.model';
import { SharedService } from '../../services/shared.service';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
  standalone: true,
  imports: [
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      CommonModule,
      MatDividerModule,
      MatListModule,
      SkeletonLoaderComponent
  ]
})
export class ImageViewComponent implements OnInit {
  public image: ImageVM;
  public userImages: ImageVM[] = [];
  public isLoading = false;
  constructor(
     @Inject(MAT_DIALOG_DATA) public data: DailogData,
    private dialog: MatDialog,
    private sharedService: SharedService
  ) {
    this.image = data.imageData as ImageVM;
   }

  ngOnInit() {
    this.getUserImages();
  }

  public close() {
    this.dialog.closeAll();
  }

  private getUserImages(){
    this.isLoading = true;
    this.sharedService.getUserImages(this.image.user.username).subscribe(res => {
      if(res) {
        this.userImages = res;
        this.isLoading = false;
      }
    });
  }

  public changeImage(image: ImageVM){
    this.image = image;
  }

}
