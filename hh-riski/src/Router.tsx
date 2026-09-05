import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { useCurrentUser } from './context/AuthContext'
import App from './App'
import FormPage from './Components/Form/FormPage'
import LoginPage from './Components/LoginPage'
import UserPage from './Components/UserPage'
import ResultsPage from './Components/Result/ResultsPage'
import MyAssessmentsPage from './Components/Assessments/MyAssesmentsPage'

const ProtectedRoute = () => {
    const { isAuthenticated } = useCurrentUser();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

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
                    path: '/login',
                    element: <LoginPage />
                },
                {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: '/user',
                            element: <UserPage />
                        },
                    ]
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