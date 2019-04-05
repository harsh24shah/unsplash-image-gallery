import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GalleryComponent } from "../../gallery/gallery.component";

@Component({
  providers: [GalleryComponent],
  selector: 'app-detailpage',
  templateUrl: 'detailpage.component.html',
  styleUrls: ['../../../app/app.component.scss']
})

export class DetailpageComponent implements OnInit {
  private id: number;

  constructor(private route: ActivatedRoute, private galleryComponent: GalleryComponent) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params["id"];
  }
}