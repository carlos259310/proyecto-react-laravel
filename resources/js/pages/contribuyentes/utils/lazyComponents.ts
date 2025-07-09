import { lazy } from 'react';

// Lazy load components for better code splitting
export const LazyContribuyenteForm = lazy(() => import('./ContribuyenteForm'));
export const LazyContribuyenteView = lazy(() => import('./ContribuyenteView'));