import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import FormPage from './Components/FormPage'
import UserPage from './Components/UserPage'
import ResultsPage from './Components/Result/ResultsPage'
import MyAssessmentsPage from './Components/Result/MyAssesmentsPage'

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
                    element: <UserPage />
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