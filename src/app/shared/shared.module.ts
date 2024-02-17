import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/homePage.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SidebarComponent } from './sidebar/sidebat.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';




@NgModule({
  declarations: [
    AboutPageComponent,
   HomePageComponent,
   SidebarComponent,
   ContactPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AboutPageComponent,
    HomePageComponent,
    SidebarComponent,
    ContactPageComponent
  ]
})
export class SharedModule { }
