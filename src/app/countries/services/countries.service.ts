
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap} from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl:string = 'https://restcountries.com/v3.1';

    public cacheStore:CacheStore= {
      byCapital :    {term : '', countries: []},
      byCountries :  {term : '', countries: []},
      byRegion :     {region : '', countries: []}
    }


//! siempre que hagas uns subscripcion tienes que cerrarla
  constructor(private http: HttpClient) {
    this.LoadFromLocalStorage();
  }

  private saveToLocalStorage(){
      localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private LoadFromLocalStorage(){
      if (!localStorage.getItem('cacheStore')) return;

      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url:string) : Observable<Country[]>{

    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => {
       console.log(error);
       return of([])

      }),
  // delay(2000)
   );

  }



  searchCountryByAlphaCode(code:string):Observable<Country | null>{
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
       catchError(error => {
        console.log(error);
        return of(null)
       })
    );
  }

  searchCapital( term:string):Observable<Country[]>{


      return this.getCountriesRequest(`${this.apiUrl}/capital/${term}`)
      .pipe(//? el tap se ejecuta cuando se resive una valor del observable, no influye en este valor
          tap(countries => this.cacheStore.byCapital = {term,countries}),
          tap(() => this.saveToLocalStorage())
      );
  }

   searchCountry(term:string):Observable<Country[]>{


      return this.getCountriesRequest(`${this.apiUrl}/name/${term}`)
      .pipe(
          tap(countries => this.cacheStore.byCountries = {term,countries}),
          tap(() => this.saveToLocalStorage())
      );


   }
   searchRegion(region:Region):Observable<Country[]>{

     return this.getCountriesRequest( `${this.apiUrl}/region/${region}`)
     .pipe(
          tap(countries => this.cacheStore.byRegion = {region,countries}),
          tap(() => this.saveToLocalStorage())
      );
   }

}
