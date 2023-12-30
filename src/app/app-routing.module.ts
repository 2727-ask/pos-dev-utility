import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { DiffComponent } from './pages/diff/diff.component';
import { ProxyComponent } from './pages/proxy/proxy.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CommonModule } from '@angular/common';
import { ProxyManagerComponent } from './pages/proxy-manager/proxy-manager.component';

const routes: Routes = [

  {
    path: '',
    component: DiffComponent
  },
  {
    path: 'proxy',
    component: ProxyComponent
  },
  {
    path: 'proxy-manager',
    component: ProxyManagerComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, {}),
    HomeRoutingModule,
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
