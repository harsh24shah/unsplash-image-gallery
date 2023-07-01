import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Generalparameters } from 'src/app/common/constants';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
  @Input() id: '';
  @Input() imageDetails: any = [];
  @Input() userImages: Observable<any>; // Related Images of current image
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  private element: any;
  private ImageUrl: string;
  private showloader = false;
  private isShareActive = false;
  slideConfig = Generalparameters.SliderConfig.SLIDERPARAMS;
  isPopupOpen = false;
  constructor() { }

  ngOnInit() {
  }

}
