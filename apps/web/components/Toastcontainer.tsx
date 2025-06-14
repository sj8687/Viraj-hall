"use client"
import React from 'react';

import { ToastContainer } from 'react-toastify';

export  function ToastProvider(){

  return (
    <div>
      <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        //   theme="white"
         className="px-10 p-3 sm:p-0 mr-2"
      />
    </div>
  );
}