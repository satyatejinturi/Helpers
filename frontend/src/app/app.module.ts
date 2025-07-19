import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProfilePhotoComponent } from './components/helper/profile-photo/profile-photo.component';
import {routes} from "./app.routes"
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations:[
        AppComponent,
        ProfilePhotoComponent
    ],
    imports:[
        BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule,
        NgModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers:[],
    bootstrap :[AppComponent]
})

export class AppModule {};