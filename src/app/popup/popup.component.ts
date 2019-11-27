import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewEncapsulation,
  Output,
  EventEmitter,
  HostListener,
  OnDestroy
} from '@angular/core';
import { Generalparameters } from '../common/constants';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['../../app/app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class PopupComponent implements OnInit, OnDestroy {
  @Input() id: '';
  @Input() sharePhoto: any = [];
  @Input() userImages: any = []; // Related Images of current image
  @Input() imageDetail: boolean;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  private element: any;
  private ImageUrl: string;
  private showloader = false;
  private isShareActive = false;
  slideConfig = Generalparameters.SliderConfig.SLIDERPARAMS;

  constructor(private popupService: PopupService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const popup = this;

    if (!this.id) {
      console.warn('element must have an id');
    }

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'popup') {
        popup.close();
      }
    });

    this.popupService.add(this);
  }

  closeModal(id: string) {
    this.isShareActive = this.popupService.close(id);
  }

  copyText(value: string) {
    this.popupService.copyMessage(value);
  }

  shareToggle() {
    this.isShareActive = !this.isShareActive;
  }

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.closeModal(this.id);
    }
  }

  @HostListener('window:popstate', ['$event'])
  handleBrosweBack(event: any) {
    this.closeModal(this.id);
  }

  ngOnDestroy(): void {
    this.popupService.remove(this.id);
    this.element.remove();
  }

  changeimage(userImage) {
    this.sharePhoto = userImage;
  }

  // to open modal
  open(): void {
    document.getElementById('popup-wrap').appendChild(this.element);
    document.getElementById('popup-wrap').classList.add('active');
    this.element.classList.remove('hide');
    document.body.classList.add('modal-open');
    window.history.pushState('forward', null, window.location.pathname + '#popup');
  }

  // to close modal
  close(): void {
    document.body.classList.remove('modal-open');
    document.getElementById('popup-wrap').classList.remove('active');
    setTimeout(() => {
      this.element.classList.add('hide');
      this.element.remove();
      this.userImages = [];
      this.sharePhoto = '';
    }, 500);
    window.history.replaceState(null, null, window.location.pathname + '');
  }

}
