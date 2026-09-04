import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import FormPage from './Components/Form/FormPage'
import LoginPage from './Components/LoginPage'
import ResultsPage from './Components/Result/ResultsPage'
import MyAssessmentsPage from './Components/Assessments/MyAssesmentsPage'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    index: true,
                    element: <FormPage />
                },
                {
                    path: '/user',
                    element: <LoginPage />
                },
                {
                    path: '/results',
                    element: <ResultsPage />
                },
                {
                    path: '/my-assessments',
                    element: <MyAssessmentsPage />
                }
            ]
        }
    ])

const Router = () => <RouterProvider router={router} />

export default Router