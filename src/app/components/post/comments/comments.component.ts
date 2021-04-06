import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/post.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() currentPostId;
  constructor() {}

  ngOnInit(): void {}
}
