import { Component } from "@angular/core";
@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
    posts = [
        {title: 'First Title', content: '1st content'},
        {title: 'Second Title', content: '2nd content'},
        {title: 'Third Title', content: '3rd content'}
    ];
}