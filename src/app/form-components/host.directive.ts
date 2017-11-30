import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[component-host]',
})
export class HostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}