import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './services/cart/cart.component';
import { ProductComponent } from './shop/product.component';
const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductComponent },
  {path: 'cart', component: CartComponent}
  // Rotte aggiuntive (esempio: home page)
  // { path: '', redirectTo: '/home', pathMatch: 'full' }, // Reindirizza alla home page
  // { path: '**', redirectTo: '/home' } // Gestione di rotte non valide
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
