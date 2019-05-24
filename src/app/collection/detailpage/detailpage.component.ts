import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryComponent } from '../../gallery/gallery.component';

@Component({
  providers: [GalleryComponent],
  selector: 'app-detailpage',
  templateUrl: 'detailpage.component.html',
  styleUrls: ['../../../app/app.component.scss']
})

export class DetailpageComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private galleryComponent: GalleryComponent) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
