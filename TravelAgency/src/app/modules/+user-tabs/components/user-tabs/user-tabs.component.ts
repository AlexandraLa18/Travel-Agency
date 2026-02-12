import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.scss'],
})
export class UserTabsComponent {
  public tabs = [
    {
      title: 'Stays',
      icon: 'bed',
      route: '/user-tabs/dashboard',
      tabName: 'dashboard',
    },
    {
      title: 'Flight + Hotel',
      icon: 'albums',
      route: '/user-tabs/flightHotel',
      tabName: 'flightHotel',
    },
    {
      title: 'Flights',
      icon: 'airplane',
      route: '/user-tabs/flights',
      tabName: 'flights',
    },
    {
      title: 'My Reservations',
      icon: 'albums',
      route: '/user-tabs/reservations',
      tabName: 'reservations',
    },
  ];

  constructor() { }

}
