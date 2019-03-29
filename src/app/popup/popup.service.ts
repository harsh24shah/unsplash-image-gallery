import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PopupService {

    private modals: any[] = [];
    sharePhoto: Observable<any>;
    isShareActive: boolean = false;

    openShareModal(id: string, image: any) {
        this.open(id);       
        return this.sharePhoto = image;
    }

    closeModal(id: string) {
        this.close(id);       
        return this.isShareActive = false;
    }

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string) {
        // open modal specified by id
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.open();
    }

    close(id: string) {
        // close modal specified by id
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }
}