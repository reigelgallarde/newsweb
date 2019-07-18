import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  currentUrl: string;
  constructor( private router: Router, private currentRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    onNavigationEnd.subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      // console.log(this.currentRoute.snapshot);
    });

    console.log(this.currentRoute.snapshot);
  }

}
