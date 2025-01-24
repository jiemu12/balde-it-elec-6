import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
})
export class PostCreateComponent {
  postForm: FormGroup;

  constructor() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    console.log('Post created:', this.postForm.value);
    // Handle your API call to create the post here
  }
}
