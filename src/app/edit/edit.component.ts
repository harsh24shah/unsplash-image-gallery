import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryServices } from '../gallery/gallery.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../app/app.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  id: string;
  private sub: any;
  photo: object;

  constructor(private route: ActivatedRoute, private galleryServices: GalleryServices) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getPhotoFromId(this.id);
  }

  getPhotoFromId(id: string) {
    this.galleryServices.getImage(id).subscribe(data => {
      this.photo = data;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
