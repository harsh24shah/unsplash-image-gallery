import { Component, OnInit, Input, ElementRef, ViewEncapsulation, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['../../app/app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class PopupComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() sharePhoto: any = [];
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  private element: any;
  private isShareActive = false;

  constructor(private popupService: PopupService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const popup = this;

    if (!this.id) {
      console.warn('element must have an id');
    }

    // append just before body close
    document.body.appendChild(this.element);

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

  // to open modal
  open(): void {
    this.element.classList.add('active');
    document.body.classList.add('modal-open');
    window.history.pushState('forward', null, '#popup');
  }

  // to close modal
  close(): void {
    this.element.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}
