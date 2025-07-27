import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchhelperPipe } from './searchhelper.pipe'; // adjust path

@NgModule({
  declarations: [SearchhelperPipe],
  exports: [SearchhelperPipe],
  imports: [CommonModule]
})
export class SharedModule {}
