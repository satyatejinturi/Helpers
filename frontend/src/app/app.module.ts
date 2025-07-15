import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InputTextTagComponent } from './input-text-tag/input-text-tag.component';

@NgModule({
    declarations:[
        AppComponent,
        InputTextTagComponent
    ],
    imports:[
        BrowserModule,
        HttpClientModule
    ],
    providers:[],
    bootstrap :[AppComponent]
})

export class AppModule {};