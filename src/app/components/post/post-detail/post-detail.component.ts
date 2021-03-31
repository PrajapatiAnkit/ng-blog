import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postId: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
