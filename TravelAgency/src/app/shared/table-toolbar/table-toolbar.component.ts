import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss'],
})
export class TableToolbarComponent {
  @Input() count?: number | null;
  @Input() displayCount? = true;
  @Input() title!: string;
  @Input() isFilterButtonVisible = true;
  @Output() filtersClicked: EventEmitter<void> = new EventEmitter();
  @Output() addButtonClicked: EventEmitter<void> = new EventEmitter();

  constructor() {}

  addButtonClick(): void {
    this.addButtonClicked.emit();
  }

  filtersClick(): void {
    this.filtersClicked.emit();
  }
}
