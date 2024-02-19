import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{



    public country?: Country;

  constructor(private actvatedRoute:ActivatedRoute,
              private conuntryService:CountriesService,
              private router:Router,
    ) {}



  ngOnInit(): void {
    
      this.actvatedRoute.params
      .pipe(
        switchMap(({id}) => this.conuntryService.searchCountryByAlphaCode(id) ),
      )
      .subscribe(country  => {
        if(!country) return this.router.navigateByUrl('');

     return this.country= country;
 
        
      });

     
  }



//   ngOnInit(): void {
//     this.actvatedRoute.params
//     .subscribe((params ) => {
//       this.conuntryService.searchCountryByAlphaCode(params['id'])
//       .subscribe(country => {
//         console.log(country);
//       })
//       console.log({params : params['id']});
//     })
// }



}
