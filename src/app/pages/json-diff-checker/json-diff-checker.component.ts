import { Component, OnInit } from '@angular/core';
import * as lodash from 'lodash';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-json-diff-checker',
  templateUrl: './json-diff-checker.component.html',
  styleUrls: ['./json-diff-checker.component.scss'],
})
export class JsonDiffCheckerComponent implements OnInit {
  jsonFile1: any;
  jsonFile2: any;
  differences: any;
  schemaMismatch: boolean = false;
  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    
  }

  

  resetComparison() {
    this.jsonFile1 = null;
    this.jsonFile2 = null;
    this.differences = null;
    this.schemaMismatch = false;
    this.errorMessage = '';
  }

  isSchemaSame(obj1: any, obj2: any): boolean {
    const obj1Keys = Object.keys(obj1).sort();
    const obj2Keys = Object.keys(obj2).sort();
    return lodash.isEqual(obj1Keys, obj2Keys);
  }

  compareJson() {
    if (!this.isSchemaSame(this.jsonFile1, this.jsonFile2)) {
      this.schemaMismatch = true;
      this.differences = null;
      this.errorMessage = 'JSON schemas do not match.';
      return;
    }

    this.schemaMismatch = false;
    this.differences = this.findDifferences(this.jsonFile1, this.jsonFile2);
  }

  findDifferences(obj1: any, obj2: any): any {
    return lodash.transform(
      obj1,
      (result: any, value, key) => {
        if (!lodash.isEqual(value, obj2[key])) {
          result[key] = { file1Value: value, file2Value: obj2[key] };
        }
      },
      {}
    );
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  onFileChange(event: any, fileNumber: number) {
    console.log("Picking up a file...");
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsText(file);
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as string);
          console.log("File Contains", json);   
          fileNumber === 1 ? (this.jsonFile1 = json) : (this.jsonFile2 = json);
          this.errorMessage = '';
          if (this.jsonFile1 && this.jsonFile2) {
            this.compareJson();
          }
        } catch (e) {
          this.errorMessage = `Invalid JSON in file ${fileNumber}: ${e}`;
          this.resetComparison();
        }
      };

      reader.onerror = (error) => {
        this.errorMessage = `Error reading file ${fileNumber}: ${error}`;
        this.resetComparison();
      };
    }
  }


  
}
