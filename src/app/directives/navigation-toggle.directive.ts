import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appNavigationToggle]',
})
export class NavigationToggleDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  @HostBinding('class.show') navOpen = false;
  @HostListener('click') toggleNavigation() {
    this.navOpen = !this.navOpen;
    const menu = this.element.nativeElement.querySelector(
      '#navbarSupportedContent'
    );
    if (this.navOpen) {
      this.renderer.addClass(menu, 'show');
    } else {
      this.renderer.removeClass(menu, 'show');
    }
  }
}
