// Import necesarios
import { NgModule } from '@angular/core';
// import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

// Definir las rutas
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: '**', component: ErrorComponent},
];

// Exportar configuracion
// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRouting {

}
