import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private _cathegoriesIsOpen: boolean = false;
  constructor() {}

  ngOnInit():void{
    if(this.isdark()){
      document.body.setAttribute('color-theme', "dark");
    }else{
      document.body.removeAttribute('color-theme');
    }
  }
  isdark(): string{
    return localStorage.getItem("BG");
  }
  openCathegories(): void {
    this._cathegoriesIsOpen = !this._cathegoriesIsOpen;
  }

  isCathegoriesOpen(): boolean {
    return this._cathegoriesIsOpen;
  }
}
