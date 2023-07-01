import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageDetailService {
  private modals: any[] = [];
  imageDetails: BehaviorSubject<any> = new BehaviorSubject('');
  userImages: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() { }

  setSelectedImage(image){
    this.imageDetails.next(image);
  }

  getSelectedImage() {
   return this.imageDetails.value;
  }

  setSelected

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
    debugger
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    debugger
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
    return false;
  }
}
