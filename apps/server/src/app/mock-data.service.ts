import { Injectable } from '@nestjs/common';

@Injectable()
export class MockDataService {
  getDashboardCards() {
    return [
      { id: 1, title: 'All (For TL)', value: '24,576', subtext: 'As Of: 20th November 2025', status: 'normal' },
      { id: 2, title: 'New Assigned', value: '200', subtext: 'As Of: 20th November 2025', status: 'warning' },
      { id: 3, title: 'In Progress', value: '200', subtext: 'As Of: 20th November 2025', status: 'warning' },
      { id: 4, title: 'Closed', value: '200', subtext: 'As Of: 20th November 2025', status: 'success' },
      { id: 5, title: 'Escalated', value: '200', subtext: 'As Of: 20th November 2025', status: 'error' },
    ];
  }

  getFilters() {
    return {
      priorities: ['P1', 'P2', 'P3'],
      types: ['TM', 'KYC', 'AML'],
      statuses: ['New', 'In-Progress', 'Escalated', 'Closed'],
      riskRatings: ['Low', 'Medium', 'High'],
      jurisdictions: ['AL', 'GB', 'CH', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'PL'],
      linesOfBusiness: ['CBK', 'IRB', 'GM', 'AM', 'SF', 'IB', 'WM', 'INS', 'DIT', 'RB', 'CST', 'CIB'],
    };
  }

  getGridData(count: number = 300) {
    const data = [];
    const priorities = ['P1', 'P2', 'P3'];
    const types = ['TM', 'KYC', 'AML'];
    const statuses = ['New', 'In-Progress', 'Escalated', 'Closed'];
    const jurisdictions = ['AL', 'GB', 'CH', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'PL', 'NO', 'FI', 'CZ', 'DK', 'AT', 'HU', 'IE', 'GR', 'PT', 'RO', 'HR', 'BE', 'LT'];
    const riskRatings = ['Low', 'Medium', 'High'];
    const linesOfBusiness = ['CBK', 'IRB', 'GM', 'AM', 'SF', 'IB', 'WM', 'INS', 'DIT', 'RB', 'CST', 'CIB'];
    const clientNames = [
      'Lorem ipsum', 'ut convallis', 'non nam', 'sapien ipsum', 'egestas nunc',
      'vel in', 'feugiat lorem', 'condimentum tristique', 'orci potenti', 'imperdiet ut',
      'cursus pulvinar', 'leo ultricies', 'senectus nisi', 'maecenas eget', 'at rhoncus',
      'nulla nam', 'metus tortor', 'turpis magna', 'tortor venenatis', 'tincidunt fermentum',
      'lobortis consectetur', 'vitae convallis', 'convallis quam.'
    ];

    for (let i = 0; i < count; i++) {
      const randomDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      data.push({
        id: `SAM-${Math.floor(1000000 + Math.random() * 9000000)}`,
        type: types[Math.floor(Math.random() * types.length)],
        generatedOn: randomDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        daysLapsed: Math.floor(Math.random() * 60),
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        jurisdiction: jurisdictions[Math.floor(Math.random() * jurisdictions.length)],
        riskRating: riskRatings[Math.floor(Math.random() * riskRatings.length)],
        score: Math.floor(Math.random() * 300),
        clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
        rulesApplied: Math.floor(Math.random() * 7) + 1,
        lineOfBusiness: linesOfBusiness[Math.floor(Math.random() * linesOfBusiness.length)],
      });
    }
    return data;
  }

  getDetails(id: string) {
    return {
      id,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      additionalInfo: [
        { label: 'Source', value: 'Transactions Monitor' },
        { label: 'Category', value: 'Financial Crime' },
        { label: 'Investigator', value: 'John Doe' },
      ],
      history: [
        { date: '2025-11-20', action: 'Created', user: 'System' },
        { date: '2025-11-21', action: 'Assigned', user: 'Supervisor' },
      ],
    };
  }

  getSmartAlerts(count: number = 10) {
    const alerts = [];
    for (let i = 0; i < count; i++) {
      alerts.push({
        alertId: `SAM-008-${67 + i}`,
        generatedOn: '20/11/2025',
        riskScore: 'High' as const,
      });
    }
    return alerts;
  }
}
