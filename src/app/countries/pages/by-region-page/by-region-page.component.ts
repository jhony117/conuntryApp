import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import {Region} from "../../interfaces/region.type"


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public initialValue:string = '';
  public countries:Country[] = [];
  public isLoading:boolean = false;

  constructor(private countryService:CountriesService) {}
  ngOnInit(): void {
   this.countries = this.countryService.cacheStore.byRegion.countries;
   this.initialValue= this.countryService.cacheStore.byRegion.region;
   this.selectedRegion= this.countryService.cacheStore.byRegion.region;

  }



    searchByRegion(term:Region) {
      this.isLoading = true;
      this.selectedRegion= term;
         this.countryService.searchRegion(term).
         subscribe(countries => {
          this.countries = countries;
          this.isLoading =false;
         });
    }
}
