import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiffServiceService } from '../../services/diff-service.service';
import { Connection } from '../../models/connection';
import { ProxyService } from '../../services/proxy.service';
import { Proxy } from '../../models/proxy';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  connectionForm: FormGroup;
  myConnections: Connection[] = [];
  registeredProxies: Proxy[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private diffService: DiffServiceService,
    private proxyService: ProxyService
  ) {
    this.connectionForm = this.formBuilder.group({
      connectionName: ['', Validators.required],
      databaseHost: ['', Validators.required],
      port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sid: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadConnections();
    this.registeredProxies = this.proxyService.getProxiesFromLocalStorage();
  }

  getRegisteredProxies() {
    return this.proxyService.getProxiesFromLocalStorage();
  }

  loadConnections(): void {
    this.myConnections = this.diffService.getConnections();
  }

  deleteProxy(id: number) : void {
    this.proxyService.deleteProxyFromLocalStorage(id);
    this.registeredProxies = this.proxyService.getProxiesFromLocalStorage();
  }

  deleteConnection(id: number): void {
    this.diffService.deleteConnection(id);
    this.loadConnections(); // Reload connections to update the list after deletion
  }

  onSubmit(): void {
    if (this.connectionForm.valid) {
      const uniqueId = Math.ceil(Math.random() * Date.now());
      const connections = JSON.parse(
        localStorage.getItem('connections') || '[]'
      );
      // this.connectionForm.value.id=Math.round(id);

      const newConnection = {
        ...this.connectionForm.value,
        id: uniqueId, // The unique ID is now a rounded-up integer
      };
      connections.push(newConnection);
      localStorage.setItem('connections', JSON.stringify(connections));
      // Reset the form if needed
      this.connectionForm.reset();

      this.loadConnections();
      // Close the modal - you can use Angular methods or Bootstrap's jQuery calls
      // For Angular, you'll need ViewChild and ElementRef to access the modal DOM element
    } else {
      // Handle the possibility of form being invalid
      console.error('Form is not valid');
    }
  }
}
