import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../../../menu_items';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  userRole = localStorage.getItem('role');

  constructor(public menuItems: MenuItems) { }

  ngOnInit(): void {
  }
  getAccess(role: any) {
    if (role?.includes(this.userRole))
      return true;
    else
      return false;
  }

}
