"use client";

import { Component, ReactNode } from "react";
import css from "./ErrorBoundary.module.css";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={css.errorContainer}>
          <div className={css.errorContent}>
            <h1 className={css.errorTitle}>Oops! Something went wrong</h1>
            <p className={css.errorMessage}>
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              className={css.retryButton}
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
