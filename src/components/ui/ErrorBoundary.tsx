"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  /** 오류가 났을 때 이 영역에 대신 보여 줄 화면 */
  fallback: ReactNode;
  /** 콘솔 로그에 남길 영역 이름 */
  name?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * 자식 컴포넌트의 렌더링 오류를 이 영역 안에 가둔다.
 * 오류 경계가 없으면 Next.js 가 페이지 전체를
 * "Application error: a client-side exception has occurred" 화면으로 바꾼다.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `[ErrorBoundary${this.props.name ? `:${this.props.name}` : ""}]`,
      error,
      info.componentStack,
    );
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default ErrorBoundary;
