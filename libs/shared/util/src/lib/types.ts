export interface DashboardCard {
  id: number;
  title: string;
  value: string;
  subtext: string;
  status: 'normal' | 'warning' | 'success' | 'error';
}

export interface GridRow {
  id: string;
  type: string;
  generatedOn: string;
  daysLapsed: number;
  priority: string;
  status: string;
  jurisdiction: string;
  riskRating: string;
  score: number;
  clientName: string;
}

export interface FilterOptions {
  priorities: string[];
  types: string[];
  statuses: string[];
  riskRatings: string[];
  jurisdictions: string[];
  linesOfBusiness: string[];
}

export interface DetailsData {
  id: string;
  description: string;
  additionalInfo: { label: string; value: string }[];
  history: { date: string; action: string; user: string }[];
}

export interface SmartAlert {
  alertId: string;
  generatedOn: string;
  riskScore: 'High' | 'Medium' | 'Low';
}
