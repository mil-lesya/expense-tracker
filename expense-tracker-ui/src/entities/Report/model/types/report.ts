import { EntityState } from '@reduxjs/toolkit';
import { Category } from 'entities/Category';
import { CurrencyCode } from 'shared/const/common';

export type ReportType = 'expense' | 'income' | 'expense,income';

export interface Report {
  amount: number
  category: Category
}

export interface Period {
  startDate: string
  endDate: string
}

export interface ReportSchema extends EntityState<Report> {
  isLoading: boolean
  error?: string
  type: ReportType
  period: Period
  wallets?: string
  categories?: string
  totalBalance?: number
  currency?: CurrencyCode
}

export interface RecordsPageReportDto {
  type?: ReportType
  category?: string
  wallet?: string
  startDate?: string
  endDate?: string
}

export interface ReportsResponseDto {
  analytic: Report[]
  totalBalance: number
  currency: CurrencyCode
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    data: number[]
    backgroundColor: string[]
    hoverBackgroundColor: string[]
    hoverOffset: number
  }>
}

export interface ExpenseItem {
  category: string
  amount: number
  color: string
  hoverColor: string
}
