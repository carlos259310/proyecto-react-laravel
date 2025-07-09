import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  filterTime: number;
}

export const usePerformanceMonitor = (
  componentName: string,
  filteredDataLength: number,
  totalDataLength: number
) => {
  const startTimeRef = useRef<number>(0);
  const metricsRef = useRef<PerformanceMetrics>({ renderTime: 0, filterTime: 0 });

  useEffect(() => {
    startTimeRef.current = performance.now();
  });

  useEffect(() => {
    const renderTime = performance.now() - startTimeRef.current;
    metricsRef.current.renderTime = renderTime;

    if (process.env.NODE_ENV === 'development') {
      console.group(`📊 Performance Metrics - ${componentName}`);
      console.log(`⏱️ Render time: ${renderTime.toFixed(2)}ms`);
      console.log(`📋 Filtered items: ${filteredDataLength}/${totalDataLength}`);
      console.log(`🔍 Filter efficiency: ${((filteredDataLength / totalDataLength) * 100).toFixed(1)}%`);
      console.groupEnd();
    }
  }, [componentName, filteredDataLength, totalDataLength]);

  const measureFilterTime = (callback: () => void) => {
    const start = performance.now();
    callback();
    const end = performance.now();
    metricsRef.current.filterTime = end - start;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 Filter time: ${(end - start).toFixed(2)}ms`);
    }
  };

  return { measureFilterTime, metrics: metricsRef.current };
};