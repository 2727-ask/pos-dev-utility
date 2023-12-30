import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alert: Alert | null = null;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.alert.subscribe((alert: Alert | null) => {
      this.alert = alert;
    });
  }
}
