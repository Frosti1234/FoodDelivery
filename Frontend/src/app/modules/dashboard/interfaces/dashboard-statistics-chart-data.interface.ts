export type STATISTICS_CHART_TYPES = 'No. products' | 'No. categories' | 'No. orders';

export interface statisticsChartData {
  name: STATISTICS_CHART_TYPES,
  value: number,
}
