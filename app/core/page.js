"use client";
// app/core/page.js

import Link from 'next/link'; // Import the Link component for navigation
import React from 'react';
import { useEffect } from 'react';
import Nav from '../components/Nav';

export default function CorePage() {
  return (
    <div>
      <Nav /> {/* Include the Nav component for navigation */}
      <CoreContent /> {/* Render the core content */}
    </div>
  );
}

const CoreContent = () => (
    <div style={{ padding: '40px', color: 'black', backgroundColor: 'white' }}>
      <h1>This is the Core Page</h1>
      <p>
        You can start building the content for your core values, mission, or features here.
      </p>
      <br />
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go back to Home
      </Link>
    </div>
  );
