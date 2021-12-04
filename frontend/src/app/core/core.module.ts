import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, LayoutComponent],
  imports: [CommonModule],
  exports: [LayoutComponent],
})
export class CoreModule {}
