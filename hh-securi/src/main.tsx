import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Router from './Router'
import { FormAnswersProvider } from './context/FormAnswersContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <FormAnswersProvider>
        <Router />
      </FormAnswersProvider>
    </AuthProvider>
  </StrictMode>,
)
