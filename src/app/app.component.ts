import { Component } from '@angular/core';
import { ColumnSettings } from '../interface/gridsettings';
import { attachment } from '../models/attachment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  componentName:string="VContact";

  public columnsSettings: ColumnSettings[] = [{
    field: 'AttachmentId',
    title: 'AttachmentId',    
    filterable: false,
    width: 40
  }, {
    field: 'FileName',
    title: 'File Name',   
    filterable: true,
    width: 40
  },
  {
    field: 'FilePath',
    title: 'Path',   
    filterable: true,
    width: 60
  },
  {
    field: 'ParentId',
    title: 'Parent',   
    filterable: false,
    width: 10
  },
  {
    field: 'GrandParentId',
    title: 'Grand Parent',   
    filterable: true,
    width: 10
  },
  {
    field: 'Size',
    title: 'Size',   
    filterable: true,
    width: 20
  }

  ];
  public defaultGridData =attachment ;
  constructor() { }

  ngOnInit() {    
  }
}
