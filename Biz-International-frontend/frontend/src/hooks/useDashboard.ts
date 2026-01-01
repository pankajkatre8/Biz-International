// src/hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function useStats() {
  return useQuery(['dashboard', 'stats'], () => api.fetchStats());
}

export function useRecentProjects(limit = 6) {
  return useQuery(['dashboard', 'recentProjects', limit], () => api.fetchRecentProjects(limit));
}

export function useTaskOverview() {
  return useQuery(['dashboard', 'taskOverview'], () => api.fetchTaskOverview());
}

export function usePendingPayments(limit = 6) {
  return useQuery(['dashboard', 'pendingPayments', limit], () => api.fetchPendingPayments(limit));
}

export function useActivity(limit = 10) {
  return useQuery(['dashboard', 'activity', limit], () => api.fetchActivity(limit));
}
