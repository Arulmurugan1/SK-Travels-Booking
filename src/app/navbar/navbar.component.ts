import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit  {


  constructor() {

  }
  ngOnInit(): void
  {}

}

