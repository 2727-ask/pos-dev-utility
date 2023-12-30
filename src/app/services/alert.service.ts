import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Alert {
  message: string;
  type: 'success' | 'warning' | 'info' | 'danger';
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject: BehaviorSubject<Alert | null> = new BehaviorSubject<Alert | null>(null);
  public alert: Observable<Alert | null> = this.alertSubject.asObservable();

  constructor() {}

  showAlert(alert: Alert): void {
    this.alertSubject.next(alert);
    setTimeout(() => this.clearAlert(), 3000); // Auto clear after 3 seconds
  }

  clearAlert(): void {
    this.alertSubject.next(null);
  }
}
