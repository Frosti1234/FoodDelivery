import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { topnavTabs } from '../../interfaces/topnav-tabs.interface';
import { Roles } from 'src/app/core/enums/roles.enum';
import { TOPNAV_ADMIN_TABS } from '../../constants/topnav-admin-tabs';
import { TOPNAV_USER_TABS } from '../../constants/topnav-user-tabs';
import { TokenPayload } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'layout-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  topnavMenu:topnavTabs[];
  tokenPayload: TokenPayload;

  constructor(
    private router: Router,
  ) {
    this.tokenPayload = jwtDecode(localStorage.getItem('token'));
    if(this.tokenPayload.role == Roles.ADMIN) {
      this.topnavMenu = TOPNAV_ADMIN_TABS;
    } else if(this.tokenPayload.role == Roles.USER){
      this.topnavMenu = TOPNAV_USER_TABS;
    }
  }

  handleTabClick(event: MatTabChangeEvent) {

    var selectedTab = this.topnavMenu.find(tab => tab.index === event.index);
    this.router.navigate(['/'+selectedTab.module+'/'+selectedTab.component]);
  }

  getSelectedTabIndex(): number {
    return this.topnavMenu.find(tab => this.router.url.includes(tab.component)).index;
  }
}
