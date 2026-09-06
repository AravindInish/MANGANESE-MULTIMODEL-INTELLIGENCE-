import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MMI Application Error Boundary caught:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0B] text-[#E2E8F0] p-6 text-center font-sans">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Runtime Preview Recovery
              </h2>
              <p className="text-xs text-white/50 mt-1 font-mono">
                {this.state.error?.message || 'An unexpected rendering error occurred.'}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-amber-500 text-black text-xs font-bold rounded uppercase tracking-wider hover:bg-amber-400 transition flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Application</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
