import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ATSsystems';
  isheader_footer_hide: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {

        if (event.urlAfterRedirects.includes('login') || event.urlAfterRedirects.includes('sign-up') || event.urlAfterRedirects.includes('forget-password')) {
          this.isheader_footer_hide = false;
        } else {
          this.isheader_footer_hide = true;
        }
      }
    });
  }
}
