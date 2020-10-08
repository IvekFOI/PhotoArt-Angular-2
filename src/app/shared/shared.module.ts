import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './pipe';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavbarComponent, TruncatePipe, FooterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NavbarComponent,
    FormsModule,
    RouterModule,
    FooterComponent
  ]
})
export class SharedModule { }
