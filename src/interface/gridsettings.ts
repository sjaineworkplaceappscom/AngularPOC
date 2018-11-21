import { State, DataResult } from "@progress/kendo-data-query";
export interface ColumnSettings {
    field: string;
    title?: string;
    filter?: 'string'|'numeric'|'date'|'boolean';
    format?: string;
    width?: number;
    _width?: number;
    filterable: boolean;
    orderIndex?: number;
}
export interface GridSettings {
    columnsConfig: ColumnSettings[];
    state: State;
    gridData?: DataResult;
}
