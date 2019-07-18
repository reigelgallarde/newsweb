import { HttpClient } from '@angular/common/http';


export class NewsService {
  apiKey = '6aab955601ae425d9c7ad00e4a2ae51b';
  newsApi = 'https://newsapi.org/v2/top-headlines';
  constructor(private http: HttpClient) { }

  getArticles( data: any ) {
    return this.http.cache().get(this.newsApi, {
      params: {page: data.page, pageSize: '10', q: data.q, country: 'us', apiKey: this.apiKey}
    });
  }
}
