import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isHoveredHome: boolean = false;
  isHoveredCart: boolean = false;
  isHoveredShop: boolean = false;
  isHoveredProfile: boolean = false;

  //Hover home
  onHoverHome() {
    this.isHoveredHome = true;
  }

  onHoverOutHome() {
    this.isHoveredHome = false;
  }
  //Hover shop
  onHoverShop() {
    this.isHoveredShop = true;
  }
  onHoverOutShop() {
    this.isHoveredShop = false;
  }
  //Hover Cart
  onHoverCart() {
    this.isHoveredCart = true;
  }

  onHoverOutCart() {
    this.isHoveredCart = false;
  }
  //Hover Profile
  onHoveredProfile() {
    this.isHoveredProfile = true;
  }
  onHoverOutProfile() {
    this.isHoveredProfile = false;
  }
}
