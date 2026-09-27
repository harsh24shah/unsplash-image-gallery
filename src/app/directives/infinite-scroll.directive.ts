import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy, effect, input } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true // Use standalone components/directives in Angular 17+
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  @Output() scrolled = new EventEmitter<void>();
  public readonly appInfiniteScrollDisabled = input(false);
  private observer?: IntersectionObserver;
  private isIntersecting = false;
  private hasEmitted = false;

  constructor(private el: ElementRef) {
    effect(() => {
      if (this.appInfiniteScrollDisabled()) {
        this.hasEmitted = false;
      } else {
        this.emitIfReady();
      }
    });
  }

  ngOnInit() {
    if (typeof IntersectionObserver === 'undefined') {
      this.isIntersecting = true;
      this.emitIfReady();
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      this.isIntersecting = entry.isIntersecting;
      if (!this.isIntersecting) {
        this.hasEmitted = false;
      } else {
        this.emitIfReady();
      }
    }, { rootMargin: '0px 0px 200px 0px', threshold: 0 });

    this.observer.observe(this.el.nativeElement);
  }

  private emitIfReady() {
    if (this.isIntersecting && !this.appInfiniteScrollDisabled() && !this.hasEmitted) {
      this.hasEmitted = true;
      this.scrolled.emit();
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
