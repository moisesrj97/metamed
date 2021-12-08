import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { InfoComponent } from './info/info.component';
import { ExerciseGroupsComponent } from './exercise-groups/exercise-groups.component';
import { MealGroupsComponent } from './meal-groups/meal-groups.component';
import { NotesComponent } from './notes/notes.component';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule } from '@angular/forms';
import { ExerciseGroupDetailComponent } from './exercise-group-detail/exercise-group-detail.component';
import { MealGroupDetailComponent } from './meal-group-detail/meal-group-detail.component';

@NgModule({
  declarations: [
    DetailsComponent,
    InfoComponent,
    ExerciseGroupsComponent,
    MealGroupsComponent,
    NotesComponent,
    MessagesComponent,
    ExerciseGroupDetailComponent,
    MealGroupDetailComponent,
  ],
  imports: [CommonModule, DetailsRoutingModule, FormsModule],
})
export class DetailsModule {}
