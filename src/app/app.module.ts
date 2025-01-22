import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './shop/product.component';
import { CartComponent } from './services/cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    NavbarComponent,
    ProductDetailComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
