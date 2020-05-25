import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appZoomHover]'
})

export class ZoomHoverDirective {

  constructor(
    private el: ElementRef) {
  }

  @HostListener('mouseenter', ['$event.target']) mEnter() {
    this.el.nativeElement.style.transition = 'all .3s';
    this.el.nativeElement.style.transform = 'scale(1.1)';
    this.el.nativeElement.style.cursor = 'pointer';
  }

  @HostListener('mouseleave', ['$event.target']) mLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
  }

}
