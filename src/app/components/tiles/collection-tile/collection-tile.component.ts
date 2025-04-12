import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CollectionVM } from 'src/app/models/collection.mode';
import { CollectionGridComponent } from '../../collection-grid/collection-grid.component';
import { DailogConfig } from 'src/app/constants/constants';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-collection-tile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, RouterModule ],
  templateUrl: './collection-tile.component.html',
  styleUrl: './collection-tile.component.scss'
})
export class CollectionTileComponent {
  @Input() collection: CollectionVM;

  constructor(public dialog: MatDialog) {

  }

  public openCollectionDetails(id: string){
    this.dialog.open(CollectionGridComponent, {
      data: this.collection,
      ...DailogConfig
    });
  }
}
