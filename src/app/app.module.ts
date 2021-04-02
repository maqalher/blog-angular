import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// formulario
import { FormsModule } from '@angular/forms';

// rutas
// import { routing, appRoutingProviders} from './app.routing';
import { AppRouting} from './app.routing';

// servicio
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    // appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
