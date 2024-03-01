//dependencies
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//css
import '../../App.css'
import { Button } from '../components/Button';
//routes
//components

export function LandingPage() {
    return (
      <>
        <main>
            <h1>Landing Page</h1>
            <Link to={ "/login" }>Login</Link>
        </main>
      </>
    );
  }
  
  