import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteAuthGuard } from '../guards/route-auth.guard';
import { DetailsComponent } from './details.component';
import { ExerciseGroupsComponent } from './exercise-groups/exercise-groups.component';
import { InfoComponent } from './info/info.component';
import { MealGroupsComponent } from './meal-groups/meal-groups.component';
import { MessagesComponent } from './messages/messages.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    children: [
      { path: 'info', component: InfoComponent, canActivate: [RouteAuthGuard] },
      {
        path: 'exercise-groups',
        component: ExerciseGroupsComponent,
        canActivate: [RouteAuthGuard],
      },
      {
        path: 'meal-groups',
        component: MealGroupsComponent,
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
