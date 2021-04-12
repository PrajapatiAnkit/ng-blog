import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post.model';

@Pipe({
  name: 'postSearch',
})
export class PostSearchPipe implements PipeTransform {
  transform(posts: Post[], keyword: string): Post[] {
    if (!posts || !keyword) {
      return posts;
    }
    const searchKeyword = keyword.toLocaleLowerCase();
    return posts.filter((post) => {
      return (
        post.title.toLocaleLowerCase().includes(searchKeyword) ||
        post.author.toLocaleLowerCase().includes(searchKeyword)
      );
    });
  }
}
