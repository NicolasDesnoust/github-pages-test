import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { HostListener } from '@angular/core';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import {
  SMALLER_MONITOR_MEDIAQUERY,
  MONITOR_MEDIAQUERY,
  MEDIAQUERIES,
  MOBILE_MEDIAQUERY,
  TABLET_MEDIAQUERY,
} from '../../../../data/mediaqueries';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  private layoutChangesSubscription: Subscription;
  showTableOfContents = true;

  showSideMenu = true;
  showSubNavbar = true;
  showFullSearchBar = true;
  showFullLogin = true;
  isOver = false;

  private scrolling = false;
  private lastScrollTopValue = 0;
  hideNavbar = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('document:scroll')
  public onScroll() {
    const scrollPosition: number =
      this.document.documentElement.scrollTop || this.document.body.scrollTop;

    this.autoHideHeader(scrollPosition);
  }

  autoHideHeader(scrollPosition: number) {
    if (!this.scrolling) {
      if (scrollPosition < this.lastScrollTopValue) {
        this.hideNavbar = false;
      } else if (scrollPosition > this.lastScrollTopValue) {
        this.hideNavbar = true;
      }
    }

    this.lastScrollTopValue = scrollPosition;
    this.scrolling = false;
  }

  ngOnInit(): void {
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([...MEDIAQUERIES])
      .subscribe((state) => {
        this.showSideMenu = this.showSubNavbar =
          state.breakpoints[SMALLER_MONITOR_MEDIAQUERY] ||
          state.breakpoints[MONITOR_MEDIAQUERY];
        this.showFullSearchBar = !state.breakpoints[MOBILE_MEDIAQUERY];
        this.isOver =
          state.breakpoints[MOBILE_MEDIAQUERY] ||
          state.breakpoints[TABLET_MEDIAQUERY];
        this.showTableOfContents = state.breakpoints[MONITOR_MEDIAQUERY];
        this.showFullLogin = !state.breakpoints[MOBILE_MEDIAQUERY];
      });
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }
}
