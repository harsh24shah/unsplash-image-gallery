import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  standalone: true,
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() itemHeight: number = 315; // Default height
  public items = [1, 3, 4, 5, 6, 7, 8, 9, 0];
  constructor() { }

  ngOnInit() {
  }

}
