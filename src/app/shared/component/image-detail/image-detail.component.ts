import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ImageDetailService } from './image-detail.service';
import { Observable } from 'rxjs';
const popupWrap = document.getElementById('popup-wrap');

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  @Input() id: string; 
  @Input() isEdit = false;
  @Input() imageDetails: Observable<any>;
  @Input() userImages: Observable<any>;
  isPopupOpen = false;
  private element: any;

  constructor(private imageDetailService: ImageDetailService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.warn('element must have an id');
    }
    this.imageDetailService.add(this);   
  }

  closeModal(id: string) {
    this.imageDetailService.close(id);
  }

  // to open modal
  open(): void {
    this.isPopupOpen = true;
    popupWrap.appendChild(this.element);
    popupWrap.classList.add('active');
    this.element.classList.remove('hide');
    document.body.classList.add('modal-open');
  }

  // to close modal
  close(): void {
    document.body.classList.remove('modal-open');
    popupWrap.classList.remove('active');
    setTimeout(() => {
      this.element.classList.add('hide');
      this.element.remove();
      this.userImages = null;
    }, 500);
    this.isPopupOpen = false;
  }

  ngOnDestroy(): void {
    this.imageDetailService.remove(this.id);
    this.isPopupOpen = false;
  }


}
