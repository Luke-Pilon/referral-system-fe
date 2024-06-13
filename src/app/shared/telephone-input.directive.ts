import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTelephoneInput]',
  standalone: true
})
export class TelephoneInputDirective {
  private previousValue = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) 
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    if (value.length > 10) {
      input.value = this.previousValue;
      return;
    }

    const formattedValue = this.formatPhoneNumber(value);
    input.value = formattedValue;
    this.previousValue = formattedValue;
  }

  private formatPhoneNumber(value: string): string {
    const areaCode = value.slice(0, 3);
    const firstSection = value.slice(3, 6);
    const secondSection = value.slice(6, 10);

    if (value.length > 6) {
      return `(${areaCode})${firstSection}-${secondSection}`;
    } else if (value.length > 3) {
      return `(${areaCode})${firstSection}`;
    } else if (value.length > 0) {
      return `(${areaCode}`;
    } else {
      return '';
    }
  }
}
