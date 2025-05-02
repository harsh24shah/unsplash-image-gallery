import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { ImageTileComponent } from 'src/app/components/tiles/image-tile/image-tile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CollectionTileComponent } from 'src/app/components/tiles/collection-tile/collection-tile.component';
import { FormsModule } from '@angular/forms';
import { SkeletonLoaderComponent } from 'src/app/components/skeleton-loader/skeleton-loader.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutes,
    ImageTileComponent,
    CollectionTileComponent,
    SkeletonLoaderComponent,
    MatTabsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule,
    TranslateModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
