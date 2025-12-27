import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ApiService, GridStore } from '@poc/shared/data-access';
import { ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'poc-operations',
  standalone: true,
  imports: [CommonModule, AgGridAngular, FormsModule, RouterModule],
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
      cellRenderer: (params: any) => `<span style="color: #37317A; font-family: Roboto, sans-serif; font-weight: 400; font-size: 14px; line-height: 32px;">${params.value}</span>`
    },
    { 
      field: 'daysLapsed', 
      headerName: 'Days Lapsed', 
      flex: 1, // [Obs 1] Responsive width
      minWidth: 110,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => `<span style="color: #37317A; font-family: Roboto, sans-serif; font-weight: 400; font-size: 14px; line-height: 32px;">${params.value}</span>`
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
        return `<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 16px; height: 16px; border-radius: 2px; background-color: ${color}; flex-shrink: 0;"></div><span style="color: #37317a; font-family: 'Open Sans', sans-serif; font-weight: 600; font-size: 14px;">${params.value}</span></div>`;
      }
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, // [Obs 1] Responsive width
      minWidth: 100,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => `<span style="color: #37317A; font-family: Roboto, sans-serif; font-weight: 400; font-size: 14px; line-height: 32px;">${params.value}</span>`
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
        return `<div style="display: inline-flex; align-items: center; justify-content: center; width: 84px; height: 20px; border-radius: 2px; background-color: ${bgColor}; font-family: 'Open Sans', sans-serif; font-weight: 600; font-size: 12px; color: white;">${params.value}</div>`;
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
      cellRenderer: (params: any) => `<span style="color: #37317A; font-family: Roboto, sans-serif; font-weight: 400; font-size: 14px; line-height: 32px;">${params.value}</span>`
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
      cellRenderer: (params: any) => `<span style="color: #37317A; font-family: Roboto, sans-serif; font-weight: 400; font-size: 14px; line-height: 32px;">${params.value}</span>`
    },
    { 
      field: 'lineOfBusiness', 
      headerName: 'Line Of Business', 
      flex: 1, // [Obs 1] Responsive width (fills remaining space)
      minWidth: 130,
      sortable: false,
      filter: false,
      suppressSizeToFit: true,
      cellRenderer: (params: any) => `<span style="color: #37317A; font-family: Roboto, sans-serif; font-weight: 400; font-size: 14px; line-height: 32px;">${params.value}</span>`
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

    // Basic filters
    if (this.selectedAlertId && !data.id?.toLowerCase().includes(this.selectedAlertId.toLowerCase())) {
      return false;
    }
    if (this.selectedPriority && data.priority !== this.selectedPriority) {
      return false;
    }
    if (this.selectedType && data.type !== this.selectedType) {
      return false;
    }
    if (this.selectedStatus && data.status !== this.selectedStatus) {
      return false;
    }
    if (this.selectedRiskRating && data.riskRating !== this.selectedRiskRating) {
      return false;
    }
    if (this.selectedLineOfBusiness && !data.lineOfBusiness?.toLowerCase().includes(this.selectedLineOfBusiness.toLowerCase())) {
      return false;
    }

    // Advance filters
    if (this.advanceFilters.alertIds) {
      const alertIds = this.advanceFilters.alertIds.split(',').map(id => id.trim().toLowerCase());
      if (!alertIds.some(id => data.id?.toLowerCase().includes(id))) {
        return false;
      }
    }
    if (this.advanceFilters.type && data.type !== this.advanceFilters.type) {
      return false;
    }
    if (this.advanceFilters.priority && data.priority !== this.advanceFilters.priority) {
      return false;
    }
    if (this.advanceFilters.status && data.status !== this.advanceFilters.status) {
      return false;
    }
    if (this.advanceFilters.jurisdiction && data.jurisdiction !== this.advanceFilters.jurisdiction) {
      return false;
    }
    if (this.advanceFilters.riskRating && data.riskRating !== this.advanceFilters.riskRating) {
      return false;
    }
    if (this.advanceFilters.lineOfBusiness && data.lineOfBusiness !== this.advanceFilters.lineOfBusiness) {
      return false;
    }
    if (this.advanceFilters.clientNames) {
      const clientNames = this.advanceFilters.clientNames.split('|').map(name => name.trim().toLowerCase());
      if (!clientNames.some(name => data.clientName?.toLowerCase().includes(name))) {
        return false;
      }
    }
    // Score range filter
    if (this.advanceFilters.scoreMin > 0 || this.advanceFilters.scoreMax < 300) {
      const score = data.score ?? 0;
      if (score < this.advanceFilters.scoreMin || score > this.advanceFilters.scoreMax) {
        return false;
      }
    }
    
    // Rules applied filter
    if (this.advanceFilters.rulesApplied > 0) {
      const rulesApplied = data.rulesApplied ?? 0;
      if (rulesApplied < this.advanceFilters.rulesApplied) {
        return false;
      }
    }
    
    // Date range filter
    if (this.advanceFilters.fromDate || this.advanceFilters.toDate) {
      // Parse the row date from generatedOn field (format may vary: "MM/DD/YYYY" or "YYYY-MM-DD")
      const rowDateStr = data.generatedOn;
      if (rowDateStr) {
        // Parse row date - try different formats
        let rowDate: Date | null = null;
        if (rowDateStr.includes('/')) {
          // Format: MM/DD/YYYY or DD/MM/YYYY
          const parts = rowDateStr.split('/');
          if (parts.length === 3) {
            // Assume MM/DD/YYYY format
            rowDate = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
          }
        } else {
          // Format: YYYY-MM-DD (native date input format)
          rowDate = new Date(rowDateStr);
        }
        
        if (rowDate && !isNaN(rowDate.getTime())) {
          // Normalize to date-only (remove time component)
          const rowDateOnly = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate());
          
          if (this.advanceFilters.fromDate) {
            const fromDate = new Date(this.advanceFilters.fromDate);
            const fromDateOnly = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
            if (rowDateOnly < fromDateOnly) {
              return false;
            }
          }
          if (this.advanceFilters.toDate) {
            const toDate = new Date(this.advanceFilters.toDate);
            const toDateOnly = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
            if (rowDateOnly > toDateOnly) {
              return false;
            }
          }
        }
      }
    }

    return true;
  };

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

