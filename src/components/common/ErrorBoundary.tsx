import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Copy, Check } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.error('[AK67 ErrorBoundary] Uncaught runtime render exception:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null, copied: false });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleCopyDiagnostics = async (): Promise<void> => {
    const { error, errorInfo } = this.state;
    const diagnosticPayload = [
      `AK67 Client Diagnostics`,
      `Time: ${new Date().toISOString()}`,
      `Error: ${error?.name || 'Unknown'}: ${error?.message || 'No message'}`,
      `Stack: ${error?.stack || 'No stack'}`,
      `Component Stack: ${errorInfo?.componentStack || 'No component stack'}`,
    ].join('\n');

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(diagnosticPayload);
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2500);
      }
    } catch (e) {
      console.warn('[ErrorBoundary] Failed to copy diagnostics to clipboard:', e);
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="my-8 mx-auto max-w-2xl rounded-xl border border-rose-500/30 bg-[#121215] p-6 text-zinc-100 shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="text-base font-bold text-white tracking-tight">
                An unexpected view error occurred
              </h2>
              <p className="text-xs text-zinc-300 leading-relaxed">
                AK67 encountered an unexpected rendering problem in this module. Your local progress in IndexedDB
                remains completely safe and intact.
              </p>

              {this.state.error?.message && (
                <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/80 p-3 font-mono text-[11px] text-rose-300 break-all select-all">
                  {this.state.error.message}
                </div>
              )}

              <div className="pt-4 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={this.handleReset}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Try Reloading View
                </button>

                {this.props.onReset && (
                  <button
                    type="button"
                    onClick={this.props.onReset}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900/60 px-3.5 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors"
                  >
                    <Home className="h-3.5 w-3.5 text-blue-400" />
                    Return to Dashboard
                  </button>
                )}

                <button
                  type="button"
                  onClick={this.handleCopyDiagnostics}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors ml-auto"
                >
                  {this.state.copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Diagnostics</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
