//dependencies
import React, { useState } from 'react';
//css
import '../../App.css'
//routes
//components
import icon from '../../assets/imgs/placeholderimages/404.png'
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export function Missing() {
  const navigate = useNavigate();
    return (
      <>
        <main className='d-flex flex-column justify-content-center align-items-center w-100 ' style={{height:"100vh"}}>
            <img src={ icon } alt='...' height="250" width="250"/>
            <h1 className='fs-1 text-secondary-emphasis'>Error 404</h1>
            <p className='fs-6 text-secondary'>Your request is not valid, there is no such page</p>
            <Button
              class={ "btn btn-warning text-white" } 
                text={ "Go Back" } 
                  disabled={ false }
                    onClick={ () => navigate(-1) }
            />
        </main>
      </>
    );
  }
  
  