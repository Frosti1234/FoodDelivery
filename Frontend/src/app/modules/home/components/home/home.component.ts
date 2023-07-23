import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ModulesPaths, ComponentsPaths } from 'src/app/core/enums/routes-paths.enum';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') public sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  showLogin = false;
  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.authService.checkToken().subscribe(res=> {
      this.authService.defaultRoute();
    }, err => {})
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  handleSignupAction() {
    this.showLogin = false;
    this.sidenav.open();
  }

  handleLoginAction() {
    this.showLogin = true;
    this.sidenav.open();
  }

  handleTabChange(event: MatTabChangeEvent) {
    const selectedIndex = event.index;
    if (selectedIndex === 0) {
      this.handleLoginAction();
    } else if (selectedIndex === 1) {
      this.handleSignupAction();
    }
  }
}
