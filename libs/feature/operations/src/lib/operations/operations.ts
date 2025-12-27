import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ApiService, GridStore } from '@poc/shared/data-access';
import { ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OpsFiltersComponent } from '../components/ops-filters/ops-filters.component';
import { OpsGridToolbarComponent } from '../components/ops-grid-toolbar/ops-grid-toolbar.component';
import { OpsAdvancedFiltersComponent } from '../components/ops-advanced-filters/ops-advanced-filters.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'poc-operations',
  standalone: true,
  imports: [CommonModule, AgGridAngular, FormsModule, RouterModule, OpsFiltersComponent, OpsGridToolbarComponent, OpsAdvancedFiltersComponent],
  templateUrl: './operations.html',
  styleUrl: './operations.scss',
  encapsulation: ViewEncapsulation.None
})
export class OperationsComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  private gridStore = inject(GridStore);

  filters$ = this.api.getFilters();
  gridData$ = this.api.getGridData(500).pipe(
    tap(rows => {
      this.gridStore.setRows(rows);
      this.totalRecords = rows.length;
    })
  );

  // Filter Models
  selectedAlertId = '';
  selectedPriority = '';
  selectedType = '';
  selectedStatus = '';
  selectedRiskRating = '';
  selectedLineOfBusiness = '';
  totalRecords = 0;

  // Advance Filters
  showAdvanceFilters = false;
  advanceFilters = {
    alertIds: '',
    type: '',
    fromDate: '',
    toDate: '',
    priority: '',
    status: '',
    jurisdiction: '',
    riskRating: '',
    scoreMin: 0,
    scoreMax: 300,
    rulesApplied: 0,
    lineOfBusiness: '',
    clientNames: ''
  };
  
  // Today's date for max date on calendar inputs (YYYY-MM-DD format)
  todayDate = new Date().toISOString().split('T')[0];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  colDefs: ColDef[] = [
    { 
      field: 'checkbox', 
      headerName: '', 
      checkboxSelection: true, 
      headerCheckboxSelection: true, 
      width: 78,
      minWidth: 78,
      maxWidth: 78,
      pinned: 'left',
      sortable: false,
      filter: false,
      suppressSizeToFit: true,
      lockPinned: true
    },
    { 
      field: 'id', 
      headerName: 'Alert Id', 
      flex: 1, // [Obs 1] Responsive width
      minWidth: 130,
      pinned: 'left',
      lockPinned: true,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => `<span class="text-[#4e2683] cursor-pointer">${params.value}</span>` 
    },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 80,
      minWidth: 70,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => `<span class="text-[#4e2683]">${params.value}</span>` 
    },
    { 
      field: 'generatedOn', 
      headerName: 'Generated On', 
      flex: 1, // [Obs 1] Responsive width
      minWidth: 120,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => `<span class="text-[#4e2683] font-roboto font-normal text-[14px] leading-[32px]">${params.value}</span>`
    },
    { 
      field: 'daysLapsed', 
      headerName: 'Days Lapsed', 
      flex: 1, // [Obs 1] Responsive width
      minWidth: 110,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => `<span class="text-[#37317A] font-roboto font-normal text-[14px] leading-[32px]">${params.value}</span>`
    },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 90,
      minWidth: 80,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => {
        // Figma colors: P1=#cc333d (red), P2=#cc660c (orange), P3=#f7a956 (yellow)
        const colors: {[key: string]: string} = {
          'P1': '#cc333d',
          'P2': '#cc660c',
          'P3': '#f7a956'
        };
        const color = colors[params.value] || '#8A8886';
        // 16x16px icon with 2px border-radius, 8px gap, text color #37317a
        return `<div class="flex items-center gap-[8px]"><div class="w-[16px] h-[16px] rounded-[2px] shrink-0" style="background-color: ${color};"></div><span class="text-[#37317a] font-opensans font-semibold text-[14px]">${params.value}</span></div>`;
      }
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, // [Obs 1] Responsive width
      minWidth: 100,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => `<span class="text-[#37317A] font-roboto font-normal text-[14px] leading-[32px]">${params.value}</span>`
    },
    { 
      field: 'jurisdiction', 
      headerName: 'Jurisdiction', 
      width: 110,
      minWidth: 100,
      sortable: false,
      filter: false,
      cellStyle: { textAlign: 'center', justifyContent: 'center' },
      cellRenderer: (params: any) => `<span class="text-[#4e2683]">${params.value}</span>` 
    },
    { 
      field: 'riskRating', 
      headerName: 'Risk Rating', 
      width: 120,
      minWidth: 110,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => {
        const colors: {[key: string]: string} = {
          'Low': '#60ad25',
          'Medium': '#e68217',
          'High': '#cc333d'
        };
        const bgColor = colors[params.value] || '#8A8886';
        // [Obs 6] Reduced height from 22px to 20px, font to 12px for better proportion
        return `<div class="inline-flex items-center justify-center w-[84px] h-[20px] rounded-[2px] font-opensans font-semibold text-[12px] text-white" style="background-color: ${bgColor};">${params.value}</div>`;
      }
    },
    { 
      field: 'score', 
      headerName: 'Score', 
      width: 80,
      minWidth: 70,
      sortable: false,
      filter: false,
      cellStyle: { textAlign: 'right', justifyContent: 'flex-end' },
      cellRenderer: (params: any) => `<span class="text-[#37317A] font-roboto font-normal text-[14px] leading-[32px]">${params.value}</span>`
    },
    { 
      field: 'clientName', 
      headerName: 'Client Name', 
      flex: 1, // [Obs 1] Responsive width
      minWidth: 130,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => `<span class="text-[#4e2683]">${params.value}</span>` 
    },
    // These columns appear on horizontal scroll
    { 
      field: 'rulesApplied', 
      headerName: 'Rules Applied', 
      width: 120,
      minWidth: 110,
      sortable: false,
      filter: false,
      suppressSizeToFit: true,
      cellRenderer: (params: any) => `<span class="text-[#37317A] font-roboto font-normal text-[14px] leading-[32px]">${params.value}</span>`
    },
    { 
      field: 'lineOfBusiness', 
      headerName: 'Line Of Business', 
      flex: 1, // [Obs 1] Responsive width (fills remaining space)
      minWidth: 130,
      sortable: false,
      filter: false,
      suppressSizeToFit: true,
      cellRenderer: (params: any) => `<span class="text-[#37317A] font-roboto font-normal text-[14px] leading-[32px]">${params.value}</span>`
    },
  ];

  private gridApi!: GridApi;
  private allRowData: any[] = [];

  // Row style function to remove borders and set alternate colors via JS
  getRowStyle = (params: any) => {
    const isEven = params.node.rowIndex % 2 === 0;
    return {
      border: 'none',
      borderBottom: 'none',
      borderTop: 'none',
      backgroundColor: isEven ? '#f7f5ff' : '#ffffff'
    };
  };

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (event.data && event.data.id) {
       this.gridStore.selectId(event.data.id);
       this.router.navigate(['/details', event.data.id]);
    }
  }

  onFilterChanged() {
    // Trigger external filtering for real-time filter as user types
    if (this.gridApi) {
      this.gridApi.onFilterChanged();
      // Update record count
      setTimeout(() => {
        this.totalRecords = this.gridApi.getDisplayedRowCount();
      }, 50);
    }
  }

  applyFilters() {
    if (!this.gridApi) return;
    
    // Use external filtering
    this.gridApi.onFilterChanged();
    
    // Update record count after filter
    setTimeout(() => {
      this.totalRecords = this.gridApi.getDisplayedRowCount();
    }, 100);
  }

  // AG Grid external filter callback
  isExternalFilterPresent = (): boolean => {
    // Check if any filter has a non-default value
    const hasBasicFilter = !!(
      this.selectedAlertId ||
      this.selectedPriority ||
      this.selectedType ||
      this.selectedStatus ||
      this.selectedRiskRating ||
      this.selectedLineOfBusiness
    );
    
    const hasAdvanceFilter = !!(
      this.advanceFilters.alertIds ||
      this.advanceFilters.type ||
      this.advanceFilters.priority ||
      this.advanceFilters.status ||
      this.advanceFilters.jurisdiction ||
      this.advanceFilters.riskRating ||
      this.advanceFilters.lineOfBusiness ||
      this.advanceFilters.clientNames ||
      this.advanceFilters.fromDate ||
      this.advanceFilters.toDate ||
      this.advanceFilters.scoreMin > 0 ||
      this.advanceFilters.scoreMax < 300 ||
      this.advanceFilters.rulesApplied > 0
    );
    
    return hasBasicFilter || hasAdvanceFilter;
  };

  // AG Grid external filter callback
  doesExternalFilterPass = (node: any): boolean => {
    const data = node.data;
    if (!data) return true;

    // Helper to check standard matches
    const checkMatch = (rowVal: string | undefined, filterVal: string, exact = true) => {
      if (!filterVal) return true;
      if (!rowVal) return false;
      return exact ? rowVal === filterVal : rowVal.toLowerCase().includes(filterVal.toLowerCase());
    };

    // 1. Basic Filters (Declarative Configuration)
    const basicConfig = [
      { val: this.selectedAlertId, field: 'id', exact: false },
      { val: this.selectedPriority, field: 'priority' },
      { val: this.selectedType, field: 'type' },
      { val: this.selectedStatus, field: 'status' },
      { val: this.selectedRiskRating, field: 'riskRating' },
      { val: this.selectedLineOfBusiness, field: 'lineOfBusiness', exact: false }
    ];

    if (basicConfig.some(c => !checkMatch(data[c.field], c.val, c.exact))) {
      return false;
    }

    // 2. Advanced Filters
    const af = this.advanceFilters;
    
    // Multi-value checks (Split string)
    if (af.alertIds) {
      const ids = af.alertIds.split(',').map(id => id.trim().toLowerCase());
      if (!ids.some(id => data.id?.toLowerCase().includes(id))) return false;
    }
    if (af.clientNames) {
      const names = af.clientNames.split('|').map(name => name.trim().toLowerCase());
      if (!names.some(name => data.clientName?.toLowerCase().includes(name))) return false;
    }

    // Single value exact checks
    const advConfig = [
      { val: af.type, field: 'type' },
      { val: af.priority, field: 'priority' },
      { val: af.status, field: 'status' },
      { val: af.jurisdiction, field: 'jurisdiction' },
      { val: af.riskRating, field: 'riskRating' },
      { val: af.lineOfBusiness, field: 'lineOfBusiness' },
    ];

    if (advConfig.some(c => !checkMatch(data[c.field], c.val))) return false;

    // Numeric Ranges
    const score = data.score ?? 0;
    if ((af.scoreMin > 0 || af.scoreMax < 300) && (score < af.scoreMin || score > af.scoreMax)) return false;

    const rules = data.rulesApplied ?? 0;
    if (af.rulesApplied > 0 && rules < af.rulesApplied) return false;

    // Date Range Logic
    if (af.fromDate || af.toDate) {
      const rowDate = this.parseDate(data.generatedOn);
      if (rowDate) {
        if (af.fromDate && rowDate < new Date(af.fromDate)) return false;
        if (af.toDate && rowDate > new Date(af.toDate)) return false;
      }
    }

    return true;
  };

  // Helper for date parsing to clean up main logic
  private parseDate(dateStr: string | undefined): Date | null {
    if (!dateStr) return null;
    let d: Date;
    if (dateStr.includes('/')) {
        const [m, day, y] = dateStr.split('/');
        d = new Date(+y, +m - 1, +day);
    } else {
        d = new Date(dateStr);
    }
    return isNaN(d.getTime()) ? null : new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  resetFilters() {
    this.selectedAlertId = '';
    this.selectedPriority = '';
    this.selectedType = '';
    this.selectedStatus = '';
    this.selectedRiskRating = '';
    this.selectedLineOfBusiness = '';
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', '');
      this.gridApi.onFilterChanged();
      setTimeout(() => {
        this.totalRecords = this.gridApi.getDisplayedRowCount();
      }, 100);
    }
  }

  applyAdvanceFilters() {
    this.showAdvanceFilters = false;
    if (this.gridApi) {
      this.gridApi.onFilterChanged();
      setTimeout(() => {
        this.totalRecords = this.gridApi.getDisplayedRowCount();
      }, 100);
    }
  }

  resetAdvanceFilters() {
    this.advanceFilters = {
      alertIds: '',
      type: '',
      fromDate: '',
      toDate: '',
      priority: '',
      status: '',
      jurisdiction: '',
      riskRating: '',
      scoreMin: 0,
      scoreMax: 300,
      rulesApplied: 0,
      lineOfBusiness: '',
      clientNames: ''
    };
    // Close the flyout and apply filters to refresh grid
    this.showAdvanceFilters = false;
    if (this.gridApi) {
      this.gridApi.onFilterChanged();
      setTimeout(() => {
        this.totalRecords = this.gridApi.getDisplayedRowCount();
      }, 100);
    }
  }

  onScoreMinChange(value: number) {
    if (value > this.advanceFilters.scoreMax) {
      this.advanceFilters.scoreMin = this.advanceFilters.scoreMax;
    }
  }

  onScoreMaxChange(value: number) {
    if (value < this.advanceFilters.scoreMin) {
      this.advanceFilters.scoreMax = this.advanceFilters.scoreMin;
    }
  }
}

