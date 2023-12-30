import { Component, Input } from '@angular/core';
import { Proxy } from '../../../models/proxy';
import { ProxyService } from '../../../services/proxy.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-proxy-card',
  templateUrl: './proxy-card.component.html',
  styleUrls: ['./proxy-card.component.scss']
})
export class ProxyCardComponent {
  @Input() proxy!: Proxy;

  constructor(private proxyService: ProxyService, private alertService: AlertService){

  }


  async stopProxy(){
    let res = await this.proxyService.stopProxyServer(this.proxy.port);
    console.log("Stopping Proxy ", res);
    if (!res.isError) {
      console.log('Proxy Stopped Successfully');
      this.proxyService.removeStartedProxy(this.proxy.id);
      this.alertService.showAlert({
        message: 'Proxy stopped successfully.',
        type: 'success',
      });
    } else {
      console.log('Error Stoping Proxy service', res.msg);
      this.alertService.showAlert({ message: res.msg, type: 'danger' });
    }
  }
  
}
