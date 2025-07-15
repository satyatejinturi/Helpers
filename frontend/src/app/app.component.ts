import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTextTagComponent } from './input-text-tag/input-text-tag.component'; 
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfilePhotoComponent } from './shared/profile-photo/profile-photo.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputTextTagComponent,SidebarComponent,ProfilePhotoComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
