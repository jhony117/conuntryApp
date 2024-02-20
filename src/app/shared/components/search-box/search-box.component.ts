import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})

//? un ng-if o cambio de ruta llama a todos los metodos onDestroy
export class SearchBoxComponent implements OnInit, OnDestroy {



private debouncer:Subject<string> = new Subject<string>();
private debouncerSuscription?: Subscription;


          @Input()
        public initialValue:string = '';

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
 this.debouncerSuscription = this.debouncer
   .pipe(
    //?hasta que el observable deja de resivir cosas por un segundo continua el susbscribe
    debounceTime(400)
   )
   .subscribe(value=>{
  this.onDebounce.emit(value);
  })
}

ngOnDestroy(): void {
    // this.debouncer.unsubscribe()
    this.debouncerSuscription?.unsubscribe();
}
    SendSearch(term:string):void {
        this.onValue.emit(term)
    }

    onKeyPress(searchTerm:string){
      this.debouncer.next(searchTerm);
    }
}
