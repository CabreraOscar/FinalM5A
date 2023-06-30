import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { OrdenComponent } from './orden/orden.component';
import { VentaComponent } from './venta/venta.component';
import { RegistrarPedidoComponent } from './registrar-pedido/registrar-pedido.component';
import { RegisterclientComponent } from './registerclient/registerclient.component'

const routes:Routes = [
  {path:'',component:HomeComponent },
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  { path: 'registrar-pedido', component: RegistrarPedidoComponent },
  {path:'orden',component:OrdenComponent},
  {path:'venta',component:VentaComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarPedidoComponent,
    OrdenComponent,
    VentaComponent,
    RegisterclientComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
