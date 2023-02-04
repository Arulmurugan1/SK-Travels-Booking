import { Injectable } from "@angular/core";

export interface menu{
  name: String,
  state: String,
  icon: String,
  role: String | null,
  color : String
}

const menu_items = [
  {state: 'home', name: 'Dashboard', icon: 'dashboard', role: 'Admin,Guest',color:'primary'},
  {state: 'booking', name: 'Book Here', icon: 'library_books', role: 'Admin,Guest', color: 'primary' },
  {state: 'myBooking', name: 'My Booking', icon: 'library_books', role: 'Admin,Guest',color:'primary'},
  // {state: 'customer', name: 'Customer', icon: 'supervised_user_circle', role: '',color:'primary'},
  // {state: 'transport', name: 'Transport', icon: 'directions_bus', role: '',color:'primary'},
  // {state: 'driver', name: 'Driver', icon: 'nature_people', role: '',color:'primary'},
   {state: 'userDetails', name: 'Users', icon: 'supervised_user_circle', role: 'Admin',color:'primary'}
];

@Injectable()
export class MenuItems{
  getMenuItems(): menu[]{
  return menu_items;
  }
}
