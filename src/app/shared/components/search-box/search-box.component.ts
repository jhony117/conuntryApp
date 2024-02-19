import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {
 

private debouncer:Subject<string> = new Subject<string>();
  
      @Input()
    public placeholder:string = '';

//public term!:string;
   //! Recuerda escribir bien el emitter en el padre y el hijo , no vas a recibir un error especifico
      //! sobre que etse mal escrito
   @Output()
   public onValue:EventEmitter<string> = new EventEmitter<string>();

   @Output()
   public onDebounce:EventEmitter<string> = new EventEmitter<string>();


 ngOnInit(): void {
   this.debouncer
   .pipe(
    //?hasta que el observable deja de resivir cosas por un segundo continua el susbscribe
    debounceTime(400)
   )
   .subscribe(value=>{
  this.onDebounce.emit(value);
  })  
}



    SendSearch(term:string):void {
        this.onValue.emit(term)
    }

    onKeyPress(searchTerm:string){
      this.debouncer.next(searchTerm);
    }
}
