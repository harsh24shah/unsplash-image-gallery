import { Injectable } from '@angular/core';

@Injectable()
export class PopupService {
    private modals: any[] = [];

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
        const modal: any = this.modals.filter(x => x.id === id)[0];
        modal.open();
    }

    close(id: string) {
        // close modal specified by id
        const modal: any = this.modals.filter(x => x.id === id)[0];
        modal.close();
        return false;
    }

    /*
      Copy to clipboard menthod for string
    */
    copyMessage(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        alert('Copied');
    }
}
