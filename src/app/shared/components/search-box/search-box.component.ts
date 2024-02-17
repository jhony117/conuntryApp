import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

      @Input()
    public placeholder:string = '';

//public term!:string;
   //! Recuerda escribir bien el emitter en el padre y el hijo , no vas a recibir un error especifico
      //! sobre que etse mal escrito
   @Output()
   public onValue:EventEmitter<string> = new EventEmitter<string>();

    SendSearch(term:string):void {
        this.onValue.emit(term)
    }
}
