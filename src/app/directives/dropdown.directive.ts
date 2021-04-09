import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  constructor(private element: ElementRef, private render: Renderer2) {}
  @HostBinding('class.show') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    const part = this.element.nativeElement.querySelector('.dropdown-menu');
    if (this.isOpen) {
      this.render.addClass(part, 'show');
    } else {
      this.render.removeClass(part, 'show');
    }
  }
}
