import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  standalone: true,
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent {
  @Input() itemHeight = 315;
  @Input() itemWidth = '100%';
  @Input() itemCount = 9;
  @Input() singleItem = false;
  public items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
