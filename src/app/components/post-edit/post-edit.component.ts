import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status;
  public url: String;
  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat']
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.gif,.jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'post/upload',
      method: 'POST',
      responseType: 'json',
      headers: {
        Authorization: this._userService.getToken()
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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    // console.log(this.identity);
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    // console.log(this.post);
    this.getPost();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
          // console.log(this.categories);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getPost() {
    // Scar el id del post de la url
    this._route.params.subscribe(params => {
      let id = +params['id']; // convierte a int
      // console.log(id)

      // Peticion ajax para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.post = response.posts;
            // console.log(this.post);

            if (this.post.user_id != this.identity.sub) {
              this._router.navigate(['inicio']);
            }
          } else {
            this._router.navigate(['inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['inicio']);
        }
      );
    });
  }

  imagenUpload(datos) {
    // console.log(datos);
    this.post.image = datos.body.image;
    // console.log(this.post.image)
  }

  onSubmit(form) {
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.post = response.post;

          // regirigir a la pagina del post
          this._router.navigate(['/entrada', this.post.id]);
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }
}
