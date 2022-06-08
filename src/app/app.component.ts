import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private _cathegoriesIsOpen: boolean = false;
  constructor() {}

  openCathegories(): void {
    this._cathegoriesIsOpen = !this._cathegoriesIsOpen;
  }

  isCathegoriesOpen(): boolean {
    return this._cathegoriesIsOpen;
  }
}
