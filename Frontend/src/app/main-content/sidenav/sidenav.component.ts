import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../../../menu_items';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public menuItems: MenuItems) { }

  ngOnInit(): void {
  }

}
