import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../../services/proxy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proxy } from '../../models/proxy';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-proxy-manager',
  templateUrl: './proxy-manager.component.html',
  styleUrls: ['./proxy-manager.component.scss'],
})
export class ProxyManagerComponent implements OnInit {
  // constructor(private proxyService: ProxyService) { }

  // mylist = ["Hello", "World"];
  // proxyList: any = [];

  // ngOnInit(): void {
  //   this.proxyList = this.proxyService.proxies;
  // }

  ipc: any;
  myForm!: FormGroup;
  proxyForm!: FormGroup;
  proxyList: any = [];
  startedProxies!: Proxy[];

  constructor(
    private proxyService: ProxyService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.proxyList = this.proxyService.getAllRegisteredProxies();
    

    this.proxyService.startedProxies.subscribe(proxies => {
      this.startedProxies = proxies;
    });

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      type: ['', Validators.required],
      schema: [''],
      // port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });

    this.proxyForm = this.formBuilder.group({
      environmentForm: ['', Validators.required], // Dropdown field
      port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Port field
    });
  }

  async startProxyService(proxy: Proxy) {
    let res = await this.proxyService.startProxyService(proxy);
    if (!res.isError) {
      console.log('Proxy Started Successfully');
      this.proxyService.updateStartedProxies(proxy);
      this.proxyService.saveRunningProxyInSessionStorage(proxy);
      this.alertService.showAlert({
        message: 'Proxy server started',
        type: 'success',
      });
    } else {
      console.log('Error Starting Proxy service', res.msg);
      this.alertService.showAlert({ message: res.msg, type: 'danger' });
    }
  }

  

  onRegisterProxy() {
    console.log('Triggered register proxy');
    if (this.myForm.valid) {
      this.myForm.value.port = 0;
      console.log('Registering Proxy ', this.myForm.value);
      this.proxyService.registerProxy(this.myForm.value);
      this.proxyList = this.proxyService.getAllRegisteredProxies();
      this.alertService.showAlert({
        message: 'Proxy registered successfully.',
        type: 'success',
      });
    }
  }

  onSubmit() {
    console.log('Submitted');

    if (this.proxyForm.valid) {
      console.log(this.proxyForm.value);
      let proxy: Proxy;

      for (let index = 0; index < this.proxyList.length; index++) {
        console.log(
          'Id',
          this.proxyForm.value.environmentForm,
          this.proxyList[index].id
        );
        if (this.proxyForm.value.environmentForm == this.proxyList[index].id) {
          proxy = this.proxyList[index];
          console.log('Proxy is ', proxy);
          proxy.port = this.proxyForm.value.port;
          this.startProxyService(proxy);
        }

        // if (this.proxyList[index].id === this.proxyForm.value.environmentForm) {
        //   proxy = this.proxyList[index];
        //   console.log("Proxy is ",proxy);

        //   // this.startProxyService(proxy);
        // } else {
        //   this.alertService.showAlert({
        //     message: 'Proxy not available, invalid proxy id.',
        //     type: 'danger',
        //   });
        // }
      }

      // Process your form data here
    }
  }

  onProxyFormSubmit() {
    if (this.proxyForm.valid) {
      console.log(this.proxyForm.value);
      // Process your form data here
    }
  }
}
