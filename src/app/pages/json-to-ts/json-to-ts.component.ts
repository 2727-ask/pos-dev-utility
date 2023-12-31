import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  Input,
} from '@angular/core';

interface Module {
  [key: string]: string | Module;
}

interface InterfaceMap {
  [interfaceName: string]: Module;
}

@Component({
  selector: 'app-json-to-ts',
  templateUrl: './json-to-ts.component.html',
  styleUrls: ['./json-to-ts.component.scss'],
})
export class JsonToTsComponent implements OnInit {
  private interfaces: InterfaceMap[] = [];
  public outputAns: any;

  constructor() {}

  ngOnInit(): void {}

  generateTsInterfaces(event: any) {
    const tsInterfaces = this.convertJsonToTs(event, 'RootObject');
    console.log(tsInterfaces);
    if (tsInterfaces.length) {
      this.outputAns = tsInterfaces;
    }
  }

  convertJsonToTs(dataBlob: string, parentInterfaceName: string): string[] {
    this.interfaces = [];
    let outputInterfaces: string[] = [];
    let mymodule: Module = {};
    if (dataBlob) {
      this.jsonToTs(dataBlob, mymodule, parentInterfaceName);
      this.interfaces.forEach((element) => {
        for (let mainKey in element) {
          const interfaceModule = this.convertObjectToInterface(
            element,
            mainKey
          );
          outputInterfaces.push(interfaceModule);
        }
      });
    }
    return outputInterfaces;
  }

  private jsonToTs(data: string, mymodule: Module, iName: string): void {
    try {
      let json = JSON.parse(data);
      for (let key in json) {
        let value = json[key];
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          mymodule[key] = typeof value;
        } else if (typeof value === 'object') {
          if (Array.isArray(value) && value.length > 0) {
            let elmType = typeof value[0];
            if (elmType === 'object' && !Array.isArray(value[0])) {
              if (this.arrayOfObjectComparator(value)) {
                mymodule[key] =
                  key.charAt(0).toUpperCase() + key.slice(1) + '[]';
                this.jsonToTs(JSON.stringify(value[0]), {}, key);
              } else {
                mymodule[key] = 'any[]';
              }
            } else {
              mymodule[key] = elmType + '[]';
            }
          } else {
            mymodule[key] = key.charAt(0).toUpperCase() + key.slice(1);
            let obj = JSON.stringify(value);
            let newModule: Module = {};
            this.jsonToTs(obj, newModule, key);
          }
        }
      }
      let temp: InterfaceMap = {};
      temp[iName] = mymodule;
      this.interfaces.push(temp);
    } catch (error) {
      console.log('Error found', 'Invalid JSON');
    }
  }

  private convertObjectToInterface(
    object: InterfaceMap,
    interfaceName: string
  ): string {
    let interfaceModule = `interface ${
      interfaceName.charAt(0).toUpperCase() + interfaceName.slice(1)
    } {\n`;
    for (let key in object) {
      for (let inKey in object[key]) {
        interfaceModule += `\t${inKey}: ${object[key][inKey]};\n`;
      }
    }
    interfaceModule += '}\n';
    return interfaceModule;
  }

  private arrayOfObjectComparator(arr: any[]): boolean {
    let parentObj = arr[0];
    return arr.every((item) =>
      Object.keys(parentObj).every((key) => key in item)
    );
  }
}
