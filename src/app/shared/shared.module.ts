import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ProxyCardComponent } from './components/proxy-card/proxy-card.component';
import { AlertComponent } from './components/alert/alert.component';
import { KissMyAceComponent } from './components/kiss-my-ace/kiss-my-ace.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, NavbarComponent, SidebarComponent, ProxyCardComponent, AlertComponent, KissMyAceComponent],
  imports: [CommonModule, TranslateModule, FormsModule, RouterModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, NavbarComponent, SidebarComponent, AlertComponent, ProxyCardComponent, KissMyAceComponent]
})
export class SharedModule {}
