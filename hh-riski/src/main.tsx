import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Router from './Router'
import { UserProvider } from './context/UserContext'
import { FormAnswersProvider } from './context/FormAnswersContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <FormAnswersProvider>
        <Router />
      </FormAnswersProvider>
    </UserProvider>
  </StrictMode>,
)
