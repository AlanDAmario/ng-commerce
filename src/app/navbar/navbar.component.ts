import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isHovered: boolean = false;

  onHoverHpage() {
    this.isHovered = true;
  }

  onHoverOutHpage() {
    this.isHovered = false;
  }
  onHoverCart() {
    this.isHovered = true;
  }

  onHoverOutCart() {
    this.isHovered = false;
  }
}
