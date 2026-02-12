import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { PaginationDTO } from '../../models/paginationDTO';
import {
  MatTable,
  MatColumnDef,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TableFieldtDTO } from '../../models/tableFieldDTO';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ACTIONS_COLUMN } from '../columns.config';

@UntilDestroy()
@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
})
export class TableWrapperComponent<T> implements AfterViewInit {
  private _dataSource = new MatTableDataSource<T>();
  public columns: TableFieldtDTO[] = [];

  itemsPerPage: number[] = [5, 10, 15];
  displayedColumns: string[] = [];

  @Input() pageSize?: number;
  @Input({ required: true }) total$!: Observable<number | undefined>;
  @Input({ required: true }) dataSource$!: Observable<T[]>;
  @Input({ required: true }) tableFields: TableFieldtDTO[] = [];
  @Input() showActions = true;
  @Input() showPagination = true;
  @Input() selection: SelectionModel<any> = new SelectionModel(false, [] as any);

  @Output() pageChange: EventEmitter<PaginationDTO> = new EventEmitter();
  @Output() rowClick: EventEmitter<T> = new EventEmitter(); 

  @ViewChild(MatTable) matTable!: MatTable<T>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;

  constructor(private readonly _cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this._dataSource.paginator = this.paginator;

    this.dataSource$.pipe(untilDestroyed(this)).subscribe(list => {
      this._dataSource = new MatTableDataSource(list);
      this.matTable.dataSource = this._dataSource;
      this._cd.detectChanges();
    });

    this._formatColumns(this.tableFields);
  }

  handlePageChange(event: PageEvent): void {
    this.pageChange.emit({
      page: event.pageIndex,
      pageSize: event.pageSize
    })
  }

  isSortingDisabled(column: TableFieldtDTO): boolean {
    return !column.sortable;
  }

  private _formatColumns(value: TableFieldtDTO[]): void {
    this.columnDefs.toArray().forEach(columnDef => {
      this.matTable.addColumnDef(columnDef);
      this._cd.detectChanges();
    });

    this.tableFields.push(ACTIONS_COLUMN);

    this.columns = this.tableFields.filter(it => !it.customTemplate) ?? [];
    this.displayedColumns = this.tableFields.filter(it => it.visible).map(it => it.columnName as string);

    this._cd.detectChanges();
  }
}
