import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost() {
    const post: Post = {
      id: Math.random().toString(36).substr(2, 9),
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post);
  }
}