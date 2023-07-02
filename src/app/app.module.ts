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
import { RegistrarPedidoComponent } from './registrar-pedido/registrar-pedido.component';
import { MaquinaAdminComponent } from './maquina-admin/maquina-admin.component';
import { RegistrarMaquinaComponent } from './registrar-maquina/registrar-maquina.component';
import { ActualizarMaquinaComponent } from './actualizar-maquina/actualizar-maquina.component'
import { RegisterclientComponent } from './registerclient/registerclient.component';
import { OrdenesComponent } from './orden/ordenes.component';
import { VentasComponent } from './venta/ventas.component';

const routes:Routes = [
  {path:'',component:HomeComponent },
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  { path: 'registrar-pedido', component: RegistrarPedidoComponent },
  { path:'maquina-admin',component:MaquinaAdminComponent},
  {path:'registrar-maquina',component:RegistrarMaquinaComponent},
  {path:'actualizar-maquina/:id' ,component:ActualizarMaquinaComponent},
  { path: 'ordenes', component: OrdenesComponent },
  { path: 'ventas', component: VentasComponent }
  
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
    MaquinaAdminComponent,
    RegistrarMaquinaComponent,
    ActualizarMaquinaComponent,
    RegisterclientComponent,
    OrdenesComponent,
    VentasComponent
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
