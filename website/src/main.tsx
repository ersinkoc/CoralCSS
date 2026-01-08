import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

// Note: In a production app, you would use the CoralCSS runtime:
// import { createCoralCDN } from '@coralcss/core/runtime'
// const coral = createCoralCDN({ autoStart: true, autoInitComponents: true })
//
// For this demo website, we use pre-defined CSS classes in styles.css
// which provide all the utility classes needed.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
