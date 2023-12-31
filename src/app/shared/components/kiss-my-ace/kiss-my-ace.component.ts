import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-kiss-my-ace',
  templateUrl: './kiss-my-ace.component.html',
  styleUrls: ['./kiss-my-ace.component.scss'],
})
export class KissMyAceComponent implements AfterViewInit {
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  @Input() customStyle!: { [key: string]: string };
  @Input() mode!: string;
  @Output() contentChanged = new EventEmitter<string>();

  private codeEditor!: ace.Ace.Editor;

  private _content!: string;

  outputValue: string = '';
  @Input() set content(value: string) {
    console.log("Value is", value);
    
    if (value) {
      this._content = value;
      console.log('Hi', this._content);
      this.outputValue = '';
      // this.codeEditor.setValue("");
      if (this.codeEditor) {
        for (let i = 0; i < this._content.length; i++) {
          this.outputValue += this._content[i] + '\n';
        }
        this.codeEditor.setValue(this.outputValue);
        this.codeEditor.clearSelection(); // To remove the highlight from the entire content
      }
    }
  }

  ngAfterViewInit() {
    ace.config.set('basePath', 'https://ace.c9.io/build/src-noconflict/');
    this.codeEditor = ace.edit(this.editor.nativeElement);
    this.codeEditor.setValue(this.outputValue);
    this.codeEditor.session.setMode(this.mode);
    this.codeEditor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    });

    this.codeEditor.on('change', () => {
      const content = this.codeEditor.getValue();
      this.contentChanged.emit(content);
    });

    if (this._content) {
      this.codeEditor.setValue(this._content);
      this.codeEditor.clearSelection();
    }
  }
}
