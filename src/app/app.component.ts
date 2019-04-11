import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { GalleryServices } from './gallery/gallery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private title = 'Wallperex';
  hasFav: number;
  loading = true;

  constructor(private galleryServices: GalleryServices, private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) { this.loading = true; }
    if (event instanceof NavigationEnd) { this.loading = false; }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) { this.loading = false; }
    if (event instanceof NavigationError) { this.loading = false; }
  }

  ngOnInit() {
    this.galleryServices.currentStatus.subscribe(hasFav => this.hasFav = hasFav);
    this.galleryServices.changeStatus();
  }


}
