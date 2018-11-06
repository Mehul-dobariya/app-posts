import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

    postId = 0;
    post = [];
    postForm:any;
    title = '';
    body = '';

    constructor(public dataService:DataService, public route:ActivatedRoute, private formBuilder:FormBuilder, private router:Router) {
        this.postId = this.route.snapshot.params['postId'];
    }

    // MODULE INIT
    ngOnInit() {
        let self = this;

        this.postForm = this.formBuilder.group({
            'id': [self.postId, []],
            'title': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
            'body': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
            'userId': ['1', []],
        });

        if (self.postId > 0) {
            this.getPost(self.postId, function (response) {
                if (response) {
                    self.post = response;
                    self.title = response.title;
                    self.body = response.body;

                    self.postForm.get('title').setValue(response.title);
                    self.postForm.get('body').setValue(response.body);
                }
            });
        }



    }

    // GET POST BY POST_ID FROM GET API: /posts/id
    getPost(postId, callback) {
        this.dataService.get({
            'url': '/posts/' + postId
        }).subscribe(
                data => {
                callback(data);
            },
            (error:any) => {
                if (error && (error.status == 401 || error.errorCode == 10)) {
                    alert("No Post found.");
                } else {
                    alert("Something went wrong. Please try again.");
                }
            }
        );
    }

    // STORE POST. THIS FUNCTION IS CALLED FROM ADD/UPDATE POST PAGE.
    async savePost() {
        let self = this;
        if (this.postForm.valid) {
            let data = this.postForm.value;
            let response = await this.storePost(data);
            if (this.postId > 0) {
                alert('Post updated successfully.');
            } else {
                alert('Post added successfully.');
            }
            this.router.navigate(['/']);
        }
    }

    // STORE POST VIA POST/PUT API: /posts OR /posts/1
    async storePost(data:any):Promise<any> {
        var self = this;
        if (this.postId > 0) {
            var response = await this.dataService.putUsingPromise({
                'url': '/posts/' + self.postId,
                'data': data
            });

        } else {
            var response = await this.dataService.postUsingPromise({
                'url': '/posts',
                'data': data
            });
        }
        return response;
    }
}
