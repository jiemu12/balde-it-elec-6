import { Injectable } from "@angular/core";
import { Subject, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { Router } from "@angular/router";
import { map, catchError } from "rxjs/operators";

interface PostResponse {
  message: string;
  posts: {
    _id: string;
    title: string;
    content: string;
    imagePath: string;
  }[];
  maxPosts: number;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

    constructor(private http: HttpClient, private router: Router) {}

    getPosts(postsPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this.http
            .get<PostResponse>(
                "http://localhost:3000/api/posts" + queryParams
            )
            .pipe(
                map(postData => {
                    return {
                        posts: postData.posts.map((post: any) => {
                            return {
                                title: post.title,
                                content: post.content,
                                id: post._id,
                                imagePath: post.imagePath
                            };
                        }),
                        maxPosts: postData.maxPosts
                    };
                })
            )
            .subscribe(transformedPostData => {
                this.posts = transformedPostData.posts;
                this.postsUpdated.next({
                    posts: [...this.posts],
                    postCount: transformedPostData.maxPosts
                });
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string): Observable<Post> {
        return this.http.get<{ _id: string; title: string; content: string; imagePath: string }>(
            `http://localhost:3000/api/posts/${id}`
        ).pipe(
            map(postData => {
                return {
                    id: postData._id,
                    title: postData.title,
                    content: postData.content,
                    imagePath: postData.imagePath
                };
            })
        );
    }

    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);

        this.http
            .post<{ message: string; post: Post }>(
                'http://localhost:3000/api/posts',
                postData
            )
            .subscribe({
                next: (responseData) => {
                    const post: Post = {
                        id: responseData.post.id,
                        title: title,
                        content: content,
                        imagePath: responseData.post.imagePath
                    };
                    this.posts.push(post);
                    this.postsUpdated.next({
                        posts: [...this.posts],
                        postCount: this.posts.length
                    });
                    this.router.navigate(['/']);
                }
            });
    }
    

    updatePost(id: string, title: string, content: string, image: File | string) {
        let postData: FormData | Post;
        
        if (typeof image === 'object') {
            // If a new file is selected
            postData = new FormData();
            postData.append('id', id);
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title);
        } else {
            // If no new file is selected
            postData = {
                id: id,
                title: title,
                content: content,
                imagePath: image
            };
        }

        this.http
            .put<{ message: string, post: Post }>(`http://localhost:3000/api/posts/${id}`, postData)
            .subscribe({
                next: (response) => {
                    const updatedPosts = [...this.posts];
                    const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
                    const post: Post = {
                        id: id,
                        title: title,
                        content: content,
                        imagePath: response.post.imagePath
                    };
                    updatedPosts[oldPostIndex] = post;
                    this.posts = updatedPosts;
                    this.postsUpdated.next({
                        posts: [...this.posts],
                        postCount: this.posts.length
                    });
                    this.router.navigate(['/']);
                }
            });
    }

    deletePost(postId: string) {
        return this.http
            .delete("http://localhost:3000/api/posts/" + postId);
    }
}