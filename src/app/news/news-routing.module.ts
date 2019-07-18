import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { NewsComponent } from './news.component';
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { NewsPublishersComponent } from './news-publishers/news-publishers.component';
import { NewsCountriesComponent } from './news-countries/news-countries.component';
import { NewsArticlesComponent } from './news-articles/news-articles.component';

const routes: Routes = [
  Shell.childRoutes([
  {
    path: 'news',
    component: NewsComponent,
    children: [
      { path: '', data: { title: extract('News - Top Headlines') }, component: NewsArticlesComponent },
      { path: 'categories', data: { title: extract('News - By Categories') }, component: NewsCategoriesComponent },
      { path: 'publishers', data: { title: extract('News - By Publishers') }, component: NewsPublishersComponent },
      { path: 'countries', data: { title: extract('News - By Countries') }, component: NewsCountriesComponent }
    ]
  }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NewsRoutingModule { }
