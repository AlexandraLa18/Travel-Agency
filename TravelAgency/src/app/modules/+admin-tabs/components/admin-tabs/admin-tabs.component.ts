import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-tabs',
  templateUrl: './admin-tabs.component.html'
})
export class AdminTabsComponent {
  public tabs = [
    {
      title: 'Vacations',
      icon: 'folder',
      route: '/admin-tabs/vacations',
      tabName: 'vacations',
    },
    {
      title: 'Hotels',
      icon: 'bed',
      route: '/admin-tabs/hotels',
      tabName: 'hotels',
    },
    {
      title: 'Flights',
      icon: 'airplane',
      route: '/admin-tabs/flights',
      tabName: 'flights',
    },
    {
      title: 'Destinations',
      icon: 'pin',
      route: '/admin-tabs/destinations',
      tabName: 'destinations',
    },
    {
      title: 'Users',
      icon: 'people',
      route: '/admin-tabs/users',
      tabName: 'users',
    }
  ];

  constructor() {}
}
