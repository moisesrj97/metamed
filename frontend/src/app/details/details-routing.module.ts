import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteAuthGuard } from '../guards/route-auth.guard';
import { DetailsComponent } from './details.component';
import { ExerciseGroupDetailComponent } from './exercise-group-detail/exercise-group-detail.component';
import { ExerciseGroupsComponent } from './exercise-groups/exercise-groups.component';
import { InfoComponent } from './info/info.component';
import { MealGroupDetailComponent } from './meal-group-detail/meal-group-detail.component';
import { MealGroupsComponent } from './meal-groups/meal-groups.component';
import { MessagesComponent } from './messages/messages.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    children: [
      { path: 'info', component: InfoComponent, canActivate: [RouteAuthGuard] },
      {
        path: 'exercise-groups/:id',
        component: ExerciseGroupDetailComponent,
        canActivate: [RouteAuthGuard],
      },
      {
        path: 'exercise-groups',
        component: ExerciseGroupsComponent,
        canActivate: [RouteAuthGuard],
      },
      {
        path: 'meal-groups/:id',
        component: MealGroupDetailComponent,
        canActivate: [RouteAuthGuard],
      },
      {
        path: 'meal-groups',
        component: MealGroupsComponent,
        canActivate: [RouteAuthGuard],
      },
      {
        path: 'notes/:id',
        component: NoteDetailComponent,
        canActivate: [RouteAuthGuard],
      },
      {
        path: 'notes',
        component: NotesComponent,
        canActivate: [RouteAuthGuard],
      },
      {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [RouteAuthGuard],
      },
      {
        path: '',
        redirectTo: 'info',
      },
      {
        path: '**',
        redirectTo: 'info',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
