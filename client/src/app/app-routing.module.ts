import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule' },
  {path: 'content', loadChildren: './pages/content/content.module#ContentModule' },
  {path: '**', redirectTo: 'content', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
