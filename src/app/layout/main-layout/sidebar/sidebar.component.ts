import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLinkWithHref],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menu = [
    { name: 'Users', link: '/users' },
    { name: 'Lists', link: '/lists' },
  ];
}
