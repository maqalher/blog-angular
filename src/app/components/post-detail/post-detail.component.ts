import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService} from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  public url;
  public identity;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    // Scar el id del post de la url
    this._route.params.subscribe(params => {
      let id = +params['id']; // convierte a int
      // console.log(id)

      // Peticion ajax para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.post = response.posts;
            // console.log(this.post);
          }else{
            this._router.navigate(['inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['inicio']);
        }
      )
    });


  }

}
