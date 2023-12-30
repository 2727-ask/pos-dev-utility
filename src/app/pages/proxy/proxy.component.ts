import { Component, OnInit } from '@angular/core';
import { Proxy } from '../../models/proxy';
import { ProxyService } from '../../services/proxy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.scss']
})
// export class ProxyComponent implements OnInit {
//   ipc:any;
//   myForm!: FormGroup;
//   proxyForm!: FormGroup;
//   proxyList: any = [];

//   constructor(private proxyService: ProxyService, private formBuilder: FormBuilder){ 
//   }

//   ngOnInit() {
//     this.proxyList = this.proxyService.proxies;
//     this.myForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       url: ['', Validators.required],
//       type: ['', Validators.required],
//       schema: [''],
//       port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
//     });

//     this.proxyForm = this.formBuilder.group({
//       dropdown: ['', Validators.required], // Dropdown field
//       port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]] // Port field
//     });
//   }

//   async startProxyService(proxy: Proxy){
//     let res = await this.proxyService.startProxyService(proxy);
//     if(!res.isError){
//       console.log("Proxy Started Successfully");
//       this.proxyService.saveRunningProxyInSessionStorage(proxy);
//     }else{
//       console.log("Error Starting Proxy service", res.msg);  
//     }
//   }

//   showSuccess() {
//     // this.notifier.notify('success', 'You are awesome! I mean it!');
//     // this.toastr.success('Hello world!', 'Toastr fun!');
//   }

//   onSubmit() {
//     if (this.myForm.valid) {
//       console.log(this.myForm.value);
//       // Process your form data here
//     }
//   }

//   onProxyFormSubmit(){
//     if (this.proxyForm.valid) {
//       console.log(this.proxyForm.value);
//       // Process your form data here
//     }
//   }
// }

export class ProxyComponent implements OnInit{
  mylist = ["Hello", "World"]
  ngOnInit(): void {
      
  }
}
