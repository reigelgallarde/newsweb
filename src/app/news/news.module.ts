import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsService } from './news.service';
import { NewsNavComponent } from './news-nav/news-nav.component';
import { NewsPublishersComponent } from './news-publishers/news-publishers.component';
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { NewsCountriesComponent } from './news-countries/news-countries.component';
import { NewsArticlesComponent } from './news-articles/news-articles.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, NewsRoutingModule, FormsModule],
  declarations: [
    NewsComponent,
    NewsNavComponent,
    NewsPublishersComponent,
    NewsCategoriesComponent,
    NewsCountriesComponent,
    NewsArticlesComponent
  ],
  providers: [NewsService]
})
export class NewsModule { }
