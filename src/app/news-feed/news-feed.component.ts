import {Component, OnInit} from '@angular/core';
import { NewsFeedService } from './news-feed.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-news-feed",
  templateUrl: "./news-feed.component.html"
  //styleUrls: ["./news-feed.component.css"]
})
export class NewsFeedComponent implements OnInit {

  articles: any[] = [];
  private articlesSub: Subscription;

  constructor(public newsFeedService: NewsFeedService) {}

  ngOnInit(){
    this.newsFeedService.getArticles();
    this.articlesSub = this.newsFeedService.getArticlesFetchedListener()
      .subscribe((articles: any) => {
        let i: any;
        for (i in articles) {
          let article = articles[i]
          //console.log(article)
          if(article['urlToImage']!= null && article['title']!=null && article['content']!=null){
            this.articles.push(article)
          }
        }

        //this.articles = articles;
        console.log(this.articles);
      });
  }

  ngOnDestoy(){
    this.articlesSub.unsubscribe();
  }
}
