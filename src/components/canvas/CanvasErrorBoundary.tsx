'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered instead of the 3D scene when WebGL is unavailable or the canvas throws. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Guards the decorative Three.js canvases. If WebGL cannot initialise (hardware
 * acceleration disabled, some mobile/privacy browsers, low-end devices) R3F throws
 * during render — without a boundary that error bubbles to Next.js and white-screens
 * the entire site. Here we catch it and show a graceful, content-preserving fallback.
 */
export default class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    // 3D is purely decorative — swallow so the rest of the page keeps working.
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
