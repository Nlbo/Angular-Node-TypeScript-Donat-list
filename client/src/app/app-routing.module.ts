import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./shared/guards/auth.guard";


const routes: Routes = [
  {path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule' },
  {path: 'content', canActivate: [AuthGuard], loadChildren: './pages/content/content.module#ContentModule' },
  {path: '**', redirectTo: 'content', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
