import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Connection } from '../../models/connection';
import { DiffServiceService } from '../../services/diff-service.service';

@Component({
  selector: 'app-diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.scss']
})
export class DiffComponent implements OnInit{
  queryFormA!: FormGroup;
  queryFormB!: FormGroup;
  connections!: Connection[]

  constructor(private formBuilder: FormBuilder, private diffService: DiffServiceService) {}
  ngOnInit(): void {
    this.connections = this.diffService.getConnections();

    this.queryFormA = this.formBuilder.group({
      connection: ['', Validators.required],
      schemaName: ['', Validators.required],
      query: ['', Validators.required]
    });

    this.queryFormB = this.formBuilder.group({
      connection: ['', Validators.required],
      schemaName: ['', Validators.required],
      query: ['', Validators.required]
    });


  }

  onSubmitQueryFormA() {
    if (this.queryFormA.valid) {
      // Process form data
      // console.log(this.queryForm.value);
    }
  }

  onSubmitQueryFormB() {
    if (this.queryFormB.valid) {
      // Process form data
      // console.log(this.queryForm.value);
    }
  }

}
