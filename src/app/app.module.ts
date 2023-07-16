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
import { ConfigEmpresaComponent } from './config-empresa/config-empresa.component';
import { ActualizarEmpresaComponent } from './actualizar-empresa/actualizar-empresa.component';
import { DetalleordenComponent } from './detalleorden/detalleorden.component';
import { PersonaComponent } from './persona/persona.component';
import { ListaPersonaComponent } from './lista-persona/lista-persona.component';
import { RolComponent } from './rol/rol.component';
import { ServicioAdminComponent } from './servicio-admin/servicio-admin.component';
import { RegistrarServicioComponent } from './registrar-servicio/registrar-servicio.component';
import { ActualizarServicioComponent } from './actualizar-servicio/actualizar-servicio.component';
import { ActualizarPersonaComponent } from './actualizar-persona/actualizar-persona.component';
import { PantallaEmpleadoComponent } from './pantalla-empleado/pantalla-empleado.component';
import { DetalleOrdenComponent } from './detalle-orden/detalle-orden.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { DatePipe } from '@angular/common';

const routes:Routes = [
  {path:'',component:HomeComponent },
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'registrar-pedido', component: RegistrarPedidoComponent },
  {path: 'maquina-admin',component:MaquinaAdminComponent},
  {path: 'registrar-maquina',component:RegistrarMaquinaComponent},
  {path: 'actualizar-maquina/:id' ,component:ActualizarMaquinaComponent},
  {path: 'ordenes', component: OrdenesComponent },
  {path: 'ventas', component: VentasComponent },
  {path: 'config-empresa', component: ConfigEmpresaComponent},
  {path: 'actualizar-empresa/:id', component:ActualizarEmpresaComponent},
  {path: 'detalleorden', component: DetalleordenComponent },
  {path: 'persona', component: PersonaComponent },
  {path: 'lista-persona', component: ListaPersonaComponent },
  {path: 'servicio-admin', component:ServicioAdminComponent},
  {path: 'actualizar-persona/:id', component:ActualizarPersonaComponent},
  {path: 'registrar-servicio', component:RegistrarServicioComponent},
  {path: 'actualizar-servicio/:id' ,component:ActualizarServicioComponent},
  {path: 'pantalla-empleado' ,component:PantallaEmpleadoComponent},
  {path: 'detalles-ordenes' ,component:DetalleOrdenComponent},
  {path: 'detalles-venta' ,component:DetalleVentaComponent},
  {path: 'detalles-ordenes/:id', component:DetalleOrdenComponent}

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
    VentasComponent,
    ConfigEmpresaComponent,
    ActualizarEmpresaComponent,
    DetalleordenComponent,
    PersonaComponent,
    ListaPersonaComponent,
    RolComponent,
    ServicioAdminComponent,
    RegistrarServicioComponent,
    ActualizarServicioComponent,
    ActualizarPersonaComponent,
   PantallaEmpleadoComponent,
   DetalleOrdenComponent,
   DetalleVentaComponent,
   

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
