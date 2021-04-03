import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public url;
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: [
      'bold',
      'italic',
      'underline',
      'paragraphFormat',
      'alert'
    ],
    toolbarButtonsSM: [
      'bold',
      'italic',
      'underline',
      'paragraphFormat',
      'alert'
    ],
    toolbarButtonsMD: [
      'bold',
      'italic',
      'underline',
      'paragraphFormat',
      'alert'
    ]
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.gif,.jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url+'user/upload',
      method: 'POST',
      responseType: 'json',
      headers: {
        Authorization: this._useService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu avatar de usuario',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(private _useService: UserService) {
    this.page_title = 'Ajustes de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._useService.getIdentity();
    this.token = this._useService.getToken();
    this.url = global.url;

    // rellenar objeto usuario
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image
    );
  }

  ngOnInit(): void {}

  onSubmit(form) {
    this._useService.update(this.token, this.user).subscribe(
      response => {
        if (response && response.status) {
          // console.log(response)
          this.status = 'success';

          // Actualizar usuario es sesion
          if (response.changes.name) {
            this.user.name = response.changes.name;
          }
          if (response.changes.surname) {
            this.user.surname = response.changes.surname;
          }
          if (response.changes.email) {
            this.user.email = response.changes.email;
          }
          if (response.changes.description) {
            this.user.description = response.changes.description;
          }
          if (response.changes.image) {
            this.user.image = response.changes.image;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  avatarUpload(datos){
    // console.log(datos.body.image);
    // // console.log(datos);
    // let data = JSON.parse(datos.body);
    // console.log(data);
    this.user.image = datos.body.image
  }
}
