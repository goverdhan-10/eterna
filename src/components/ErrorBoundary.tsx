'use client';

import React, { ReactNode, ReactElement } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactElement;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center h-screen bg-[#0B0E11] text-slate-100">
          <AlertCircle size={48} className="mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-slate-400 mb-4">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-[#3B82F6] rounded-sm font-medium hover:bg-[#2563EB] transition-colors"
          >
            Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
