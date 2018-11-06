import { Component, OnInit, ViewChild } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../core/services/data.service';
import {OverlayContainer} from '@angular/cdk/overlay';

export interface PostData {
    userId: string;
    id: string;
    title: string;
    body: string;
    actions: string;
}

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    displayedColumns:string[] = ['userId', 'id', 'title', 'body', 'actions'];
    dataSource:MatTableDataSource<PostData>;

    @ViewChild(MatPaginator) paginator:MatPaginator;
    @ViewChild(MatSort) sort:MatSort;

    constructor(public dataService:DataService, private router:Router) {
    }

    // Component Init
    ngOnInit() {
        let self = this;

        this.getPosts(function (response) {
            if (response) {
                // Assign the data to the data source for the table to render
                self.dataSource = new MatTableDataSource(response);
                self.dataSource.paginator = self.paginator;
                self.dataSource.sort = self.sort;
            }
        });
    }

    applyFilter(filterValue:string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    // GET ALL POST FROM GET API: /posts
    getPosts(callback) {
        this.dataService.get({
            'url': '/posts'
        }).subscribe(
                data => {
                callback(data);
            },
            (error:any) => {
                if (error && (error.status == 401 || error.errorCode == 10)) {
                    alert("No post found.");
                } else {
                    alert("Something went wrong. Please try again.");
                }
            }
        );
    }

    // DELETE POST BY POST_ID. THIS FUNCTION IS CALLED FROM LIST PAGE.
    deletePost(postId) {
        let self = this;
        var result = confirm("Are you sure you want to delete this post?");
        if (result) {
            this.removePost(postId, function (response) {
                if (response) {
                    alert('Post deleted successfully.');
                    self.router.navigate(['/']);
                }
            });
        }
    }

    // DELETE POST VIA DELETE API: /posts/id
    removePost(postId, callback) {
        this.dataService.delete({
            'url': '/posts/' + postId
        }).subscribe(
                data => {
                callback(data);
            },
            (error:any) => {
                if (error && (error.status == 401 || error.errorCode == 10)) {
                    alert("No post found.");
                } else {
                    alert("Something went wrong. Please try again.");
                }
            }
        );
    }

}