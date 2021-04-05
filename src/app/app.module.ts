import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// formulario
import { FormsModule } from '@angular/forms';

// rutas
// import { routing, appRoutingProviders} from './app.routing';
import { AppRouting} from './app.routing';

// servicio
import { HttpClientModule } from '@angular/common/http';

// Plugins
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';

// Guard
import { UserService } from './services/user.service';
import { IdentityGuard } from './services/identity.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    CategoryNewComponent,
    PostNewComponent,
    PostDetailComponent,
    PostEditComponent,
    CategoryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule,
    FroalaViewModule,
    AngularFileUploaderModule
  ],
  providers: [
    // appRoutingProviders
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
