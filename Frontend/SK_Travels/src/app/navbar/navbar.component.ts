import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { environment } from 'src/environments/environment';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Booking',
    children: [{name: 'Bookings'}, {name: 'Customers'}],
  },
  {
    name: 'Others',
    children: [
      {
        name: 'Drivers',
        children: [{name: 'Available Drivers'}],
      },
      {
        name: 'Vehicles',
        children: [{name: 'Available Vehicles'}],
      },
      {
        name: 'Routes',
        children: [{name: 'Available Routes'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit  {
  title = 'SK Travels';
  mode:any = environment.sideNavMode;
  hasBackDrop:any = environment.backDrop;
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  ngOnInit(): void
  {}

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}

