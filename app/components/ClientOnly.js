// app/components/ClientOnly.js

"use client";

import { useState, useEffect } from 'react';

/**
 * A wrapper component that ensures its children are only rendered on the client-side.
 * This is crucial for components that use browser-specific APIs (like window or document)
 * or have animations that might cause hydration mismatch errors.
 */
export default function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // While not mounted, render nothing. This matches the server-rendered output.
  if (!hasMounted) {
    return null;
  }

  // Once mounted, render the children.
  return <>{children}</>;
}