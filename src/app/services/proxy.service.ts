import { Injectable } from '@angular/core';
import { Proxy } from '../models/proxy';
import { IpcRenderer } from 'electron/renderer';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  private startedProxiesSubject: BehaviorSubject<Proxy[]> = new BehaviorSubject<
    Proxy[]
  >([]);
  public startedProxies = this.startedProxiesSubject.asObservable();

  proxies: Proxy[] = [
    {
      id: 1,
      name: 'TabletAms',
      port: 27,
      schema: 'FEXLINK-QA-GC',
      url: 'https://tabletams.qawesternunion.com',
      type: 'QA',
    },
    {
      id: 2,
      name: 'E2E-UAT',
      port: 27,
      schema: 'WEBUSERE2EUATP',
      url: 'https://wupos2-e2e-uat.westernunion.com',
      type: 'UAT',
    },
    {
      id: 3,
      name: 'CLQA1',
      port: 27,
      schema: 'FEXLINK & FEXLINKAGT',
      url: 'https://wuposclqa1.qawesternunion.com',
      type: 'QA',
    },
    {
      id: 4,
      name: 'CLQA2',
      port: 27,
      schema: 'FEXLINKQA6',
      url: 'https://wuposclqa2.qawesternunion.com',
      type: 'QA',
    },
    {
      id: 5,
      name: 'TABLETFIAT',
      port: 27,
      schema: 'FEXLINK6_NEW',
      url: 'https://wupostabletfiat.qawesternunion.com',
      type: 'QA',
    },
  ];

  private ipc: Electron.IpcRenderer | undefined;

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        console.error('Could not load electron IPC', error);
      }
    } else {
      console.warn('Electron IPC not available');
    }
  }

  // Call this method when a proxy service is started
  public updateStartedProxies(newProxy: Proxy): void {
    const currentProxies = this.startedProxiesSubject.getValue();
    this.startedProxiesSubject.next([...currentProxies, newProxy]);
  }

  public removeStartedProxy(proxyId: number): void {
    const currentProxies = this.startedProxiesSubject.getValue();
    const updatedProxies = currentProxies.filter(
      (proxy) => proxy.id !== proxyId
    );
    this.startedProxiesSubject.next(updatedProxies);
  }

  async startProxyService(proxy: Proxy): Promise<any> {
    if (!this.ipc) {
      console.error('IPC Renderer is not available');
      return;
    }
    return this.ipc.invoke('startProxyService', proxy);
  }

  async registerProxy(proxy: Proxy): Promise<void> {
    const existingProxies = this.getProxiesFromLocalStorage();
    proxy.id = Date.now();
    const updatedProxies = [...existingProxies, proxy];
    localStorage.setItem('proxies', JSON.stringify(updatedProxies));
  }

  async saveRunningProxyInSessionStorage(proxy: Proxy): Promise<void> {
    const runningProxies = await this.getRunningProxyFromSessionStorage();
    const updatedRunningProxies = [...runningProxies, proxy];
    sessionStorage.setItem(
      'runningJobs',
      JSON.stringify(updatedRunningProxies)
    );
  }

  async getRunningProxyFromSessionStorage(): Promise<Proxy[]> {
    const runningProxiesJSON = sessionStorage.getItem('runningJobs');
    return runningProxiesJSON ? JSON.parse(runningProxiesJSON) : [];
  }

  async stopProxyServer(_port: number): Promise<any> {
    if (!this.ipc) {
      console.error('IPC Renderer is not available');
      return;
    }
    let res = await this.ipc.invoke('stopProxyServer', _port);
    console.log('Stopping server res', res);
    return res;
  }

  public getProxiesFromLocalStorage(): Proxy[] {
    const proxiesJSON = localStorage.getItem('proxies');
    return proxiesJSON ? JSON.parse(proxiesJSON) : [];
  }

  public deleteProxyFromLocalStorage(proxyId: number): void {
    const currentProxies = this.getProxiesFromLocalStorage();
    const updatedProxies = currentProxies.filter(
      (proxy) => proxy.id !== proxyId
    );
    localStorage.setItem('proxies', JSON.stringify(updatedProxies));
  }

  public getAllRegisteredProxies(): Proxy[] {
    let registeredproxiesList = [
      ...this.proxies,
      ...this.getProxiesFromLocalStorage(),
    ];
    return registeredproxiesList;
  }
}
