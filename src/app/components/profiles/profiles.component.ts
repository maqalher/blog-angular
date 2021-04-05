import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  providers: [PostService, UserService]
})
export class ProfilesComponent implements OnInit {
  public url;
  public posts: Array<Post>;
  public user: User;
  public identity;
  public token;
  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    // Scar el id del post de la url
    this._route.params.subscribe(params => {
      let userId = +params['id']; // convierte a int
      // console.log(userId)
      this.getUser(userId);
      this.getPost(userId);
    });
  }

  getUser(userId){
    this._userService.getUser(userId).subscribe(
      response => {
        if (response.status == 'success') {
          this.user = response.user;
          console.log(this.user);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getPost(userId) {
    this._userService.getPosts(userId).subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
          // console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(error);
      }
    );
  }
}
