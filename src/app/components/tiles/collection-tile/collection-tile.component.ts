import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, computed, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CollectionVM } from 'src/app/models/collection.mode';
import { CollectionGridComponent } from '../../collection-grid/collection-grid.component';
import { DailogConfig } from 'src/app/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { SkeletonLoaderComponent } from '../../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-collection-tile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, RouterModule, SkeletonLoaderComponent],
  templateUrl: './collection-tile.component.html',
  styleUrl: './collection-tile.component.scss'
})
export class CollectionTileComponent {
  public collection = input.required<CollectionVM>();
  private loadedUrl = signal<string | null>(null);
  public imageLoaded = computed(() => this.loadedUrl() === this.collection().cover_photo.urls.thumb);

  constructor(public dialog: MatDialog) {

  }

  public markImageLoaded(url: string) {
    this.loadedUrl.set(url);
  }

  public openCollectionDetails(id: string){
    this.dialog.open(CollectionGridComponent, {
      data: this.collection(),
      ...DailogConfig
    });
  }
}
