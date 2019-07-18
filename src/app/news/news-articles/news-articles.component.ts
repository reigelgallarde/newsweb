import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { NewsService } from '../news.service';
import { ArticleModel } from '../article.model';

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: ArticleModel[];
}

@Component({
  selector: 'app-news-articles',
  templateUrl: './news-articles.component.html',
  styleUrls: ['./news-articles.component.scss']
})
export class NewsArticlesComponent implements OnInit {
  isLoading = false;
  updatedResponse: NewsResponse;
  pages: number;
  totalResults = 0;
  currentPage = 1;
  next = -1;
  prev = -1;
  query = '';
  articles: ArticleModel[] = [];
  constructor( private newsServices: NewsService, private router: Router, private currentRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.isLoading = true;
    this.newsServices.getArticles({q: this.query, page: this.currentPage})
      .subscribe((response: NewsResponse) => {
        this.updatedResponse = response;
        this.articles = response.articles;
        this.pages = Math.ceil(response.totalResults / 10);
        this.isLoading = false;
        this.totalResults = response.totalResults;
        this.next = this.currentPage + 1 > this.pages ? -1 : this.currentPage + 1;
        this.prev = this.currentPage - 1 <= 0 ? -1 : this.currentPage - 1;
      });
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    onNavigationEnd.subscribe((event: NavigationEnd) => {
      const params = this.currentRoute.snapshot.queryParams;
      if (!params['q'] && !params['page']) {
        this.articles = this.updatedResponse.articles;
        this.totalResults = this.updatedResponse.totalResults;
        this.currentPage = 1;
      }
    });
  }

  onSearch(form: NgForm) {
    if (!form.value.q) {
      this.articles = this.updatedResponse.articles;
      this.totalResults = this.updatedResponse.totalResults;
      return;
    }
    this.router.navigate([], {
      relativeTo: this.currentRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        q: form.value.q,
        page: 1
      }
    });

    this.isLoading = true;
    this.query = form.value.q;
    this.newsServices.getArticles({q: this.query, page: this.currentPage})
      .subscribe((response: NewsResponse) => {
        this.articles = response.articles;
        this.pages = Math.ceil(response.totalResults / 10);
        this.isLoading = false;
        this.totalResults = response.totalResults;
        this.next = this.currentPage + 1 > this.pages ? -1 : this.currentPage + 1;
        this.prev = this.currentPage - 1 <= 0 ? -1 : this.currentPage - 1;
      });

    form.reset();
  }

  onPaginate(page: string) {

    this.router.navigate([], {
      relativeTo: this.currentRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        page: page
      }
    });

    if ( page === 'prev' ) {
      this.currentPage -= 1;
    }
    if ( page === 'prev' ) {
      this.currentPage -= 1;
    }
    if (page && !isNaN(+page)) {
      this.currentPage = +page;
    }
    this.next = this.currentPage + 1 > this.pages ? -1 : this.currentPage + 1;
    this.prev = this.currentPage - 1 <= 0 ? -1 : this.currentPage - 1;
    this.isLoading = true;
    this.newsServices.getArticles({q: this.query, page: this.currentPage})
      .subscribe((response: NewsResponse) => {
        this.articles = response.articles;
        this.pages = Math.ceil(response.totalResults / 10);
        this.isLoading = false;
      });
    return false;
  }

}
