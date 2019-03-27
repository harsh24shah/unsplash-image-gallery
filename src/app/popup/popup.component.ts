import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { PopupService } from './popup.service'

@Component({
  selector: 'popup',
  template: `<ng-content></ng-content>`,
  styleUrls: ['../../app/app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupComponent implements OnInit {
  @Input() id: string;
  private element: any;

  constructor(private popupSrvice: PopupService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    let popup = this;

    if (!this.id) {
      console.warn('element must have an id');
    }

    //append just before body close
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'popup') {
        popup.close();
      }
    });

    this.popupSrvice.add(this);
  }

  ngOnDestroy(): void {
    this.popupSrvice.remove(this.id);
    this.element.remove();
  }

  // to open modal
  open(): void {
    this.element.classList.add('active');
    document.body.classList.add('modal-open');
  }

  // to close modal
  close(): void {
    this.element.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}
