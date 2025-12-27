import { Injectable, computed, signal } from '@angular/core';
import { GridRow } from '@poc/shared/util';

@Injectable({
  providedIn: 'root'
})
export class GridStore {
  // Signal based key-value store or just generic store logic
  readonly rows = signal<GridRow[]>([]);
  readonly selectedId = signal<string | null>(null);

  setRows(rows: GridRow[]) {
    this.rows.set(rows);
  }

  selectId(id: string) {
    this.selectedId.set(id);
  }

  readonly nextId = computed(() => {
    const current = this.selectedId();
    const rows = this.rows();
    if (!current || rows.length === 0) return null;
    const index = rows.findIndex(r => r.id === current);
    if (index === -1 || index >= rows.length - 1) return null;
    return rows[index + 1].id;
  });

  readonly prevId = computed(() => {
    const current = this.selectedId();
    const rows = this.rows();
    if (!current || rows.length === 0) return null;
    const index = rows.findIndex(r => r.id === current);
    if (index <= 0) return null;
    return rows[index - 1].id;
  });
}
