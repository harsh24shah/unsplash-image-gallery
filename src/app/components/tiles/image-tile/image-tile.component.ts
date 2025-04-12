import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DailogData, ImageVM } from 'src/app/models/image.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ImageEditComponent } from '../../image-edit/image-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewComponent } from '../../image-view/image-view.component';
import { DailogConfig } from 'src/app/constants/constants';
import { CollectionImageVM } from 'src/app/models/collection.mode';

@Component({
  selector: 'app-image-tile',
  templateUrl: './image-tile.component.html',
  styleUrls: ['./image-tile.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatIconModule],
})
export class ImageTileComponent implements OnInit {
  @Input() image: ImageVM | CollectionImageVM;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}


  public openEditDialog(_event: MouseEvent| PointerEvent, imageData: ImageVM | CollectionImageVM) {
    _event.stopPropagation();
    const dailogData = new DailogData(imageData);
    this.dialog.open(ImageEditComponent, {
      data: dailogData,
     ...DailogConfig
    });
  }

  public openViewDialog(imageData: ImageVM | CollectionImageVM){
    const dailogData = new DailogData(imageData);
    this.dialog.open(ImageViewComponent, {
      data: dailogData,
      ...DailogConfig
    });
  }

}
