import { Component, OnInit, Input } from '@angular/core';
import { GridComponent } from '../../../node_modules/@progress/kendo-angular-grid';
import { GridSettings, ColumnSettings } from '../../interface/gridsettings';
import { State,process } from '../../../node_modules/@progress/kendo-data-query';
import { sampleProducts } from '../../models/sampleproducs';
import { StatePersistingService } from '../state-persisting.service';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  styleUrls: ['./common-grid.component.scss']
})
export class CommonGridComponent implements OnInit {

  public defaultColumnsSettings: ColumnSettings[] = [{
    field: 'ProductID',
    title: 'ID',
    filterable: false,
    width: 40
  }, {
    field: 'ProductName',
    title: 'Product Name',
    filterable: true,
    width: 300
  }, {
    field: 'FirstOrderedOn',
    title: 'First Ordered On',
    filter: 'date',
    format: '{0:d}',
    width: 240,
    filterable: true
  }, {
    field: 'UnitPrice',
    title: 'Unit Price',
    filter: 'numeric',
    format: '{0:c}',
    width: 180,
    filterable: true
  }, {
    field: 'Discontinued',
    filter: 'boolean',
    width: 120,
    filterable: true
  }];
  public defaultGridData = sampleProducts;
  public defaultFilter: any = {
    logic: 'and',
    filters: []
  };

  public defaultState: any = {
    skip: 0,
    take: 5,
    // Initial filter descriptor
    filter: this.defaultFilter
  };

  @Input() ColumnSettings: ColumnSettings[];//=this.defaultColumnsSettings;
  @Input() GridData: any;//=this.defaultGridData;
  @Input() Filter: any = this.defaultFilter;
  @Input() State: any = this.defaultState;
  @Input() ComponentName: any = "";

  ngOnChange() {
    this.mapGridData();
    const gridSettings: GridSettings = this.persistingService.get(this.ComponentName +'gridSettings');
    if (gridSettings !== null) {
      this.gridSettings = this.mapGridSettings(gridSettings);
    }
  }

  ngOnInit() {
    this.mapGridData();

    const gridSettings: GridSettings = this.persistingService.get(this.ComponentName +'gridSettings');
    if (gridSettings !== null) {
      this.gridSettings = this.mapGridSettings(gridSettings);
    }
  }

  public mapGridData() {
    this.gridSettings = {
      state: this.State,
      gridData: this.GridData,
      columnsConfig: this.ColumnSettings
    };
  }

  public gridSettings: GridSettings = {
    state: this.State,
    gridData: this.GridData,
    columnsConfig: this.ColumnSettings
  };

  constructor(public persistingService: StatePersistingService) {
    // const gridSettings: GridSettings = this.persistingService.get(this.ComponentName +'gridSettings');    
    // if (gridSettings !== null) {
    //   this.gridSettings = this.mapGridSettings(gridSettings);
    // }
  }

  public get savedStateExists(): boolean {
    return !!this.persistingService.get(this.ComponentName +'gridSettings');
  }

  public dataStateChange(state: State): void {
    debugger;
    this.gridSettings.state = state;

    const data: any = this.gridSettings.gridData;
    let mydata:any=data;
    if(data.data!=undefined){
      mydata=data.data;
    }
    else
    {
      mydata=data.data;
    }
    this.gridSettings.gridData = process(mydata, state);
  }

  public saveGridSettings(grid: GridComponent): void {
    const columns = grid.columns;

    const gridConfig = {
      state: this.gridSettings.state,
      columnsConfig: columns.toArray().map(item => {
        return Object.keys(item)
          .filter(propName => !propName.toLowerCase()
            .includes('template'))
          .reduce((acc, curr) => ({ ...acc, ...{ [curr]: item[curr] } }), <ColumnSettings>{});
      })
    };

    this.persistingService.set(this.ComponentName +'gridSettings', gridConfig);
  }

  public mapGridSettings(gridSettings: GridSettings): GridSettings {

    const state = gridSettings.state;
    const data: any = this.gridSettings.gridData;

    this.mapDateFilter(state.filter);

    return {
      state,
      columnsConfig: gridSettings.columnsConfig.sort((a, b) => a.orderIndex - b.orderIndex),
      gridData: process(data, state)
    };
  }

  private mapDateFilter = (descriptor: any) => {
    const filters = descriptor.filters || [];

    filters.forEach(filter => {
      if (filter.filters) {
        this.mapDateFilter(filter);
      }
      else if (filter.field === 'FirstOrderedOn' && filter.value) {
        filter.value = new Date(filter.value);
      }
    });
  }

}
