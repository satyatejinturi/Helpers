import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProfilePhotoComponent } from './shared/profile-photo/profile-photo.component';
@NgModule({
    declarations:[
        AppComponent,
        ProfilePhotoComponent
    ],
    imports:[
        BrowserModule,
        HttpClientModule
    ],
    providers:[],
    bootstrap :[AppComponent]
})

export class AppModule {};