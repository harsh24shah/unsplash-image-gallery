import { Component, Input, OnInit } from '@angular/core';
import { ImageDetailService } from '../image-detail/image-detail.service';

@Component({
  selector: 'app-grid-image',
  templateUrl: './grid-image.component.html',
  styleUrls: ['./grid-image.component.scss']
})
export class GridImageComponent implements OnInit {
  @Input() photos: any;

  constructor(
    private imageDetailService: ImageDetailService
  ) { }

  ngOnInit() {
  }

  openShareModal(id, image) {
    this.imageDetailService.open(id);
  }

}
