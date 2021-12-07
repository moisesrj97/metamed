import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CardComponent } from './card/card.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { AddModalComponent } from './add-modal/add-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
    CardComponent,
    SearchComponent,
    AddModalComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, FormsModule, RouterModule],
})
export class DashboardModule {}
