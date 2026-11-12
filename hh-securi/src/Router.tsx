import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { useCurrentUser } from './context/AuthContext'
import App from './App'
import FormPage from './Components/Form/FormPage'
import LoginPage from './Components/LoginPage'
import UserPage from './Components/UserPage'
import ResultsPage from './Components/Result/ResultsPage'
import MyAssessmentsPage from './Components/Assessments/MyAssesmentsPage'
import DashboardPage from './Components/DashboardPage'
import AdminManagementPage from './Components/AdminManagementPage'

const ProtectedRoute = () => {
    const { isAuthenticated } = useCurrentUser();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

const AdminRoute = () => {
    const { user } = useCurrentUser();
    return user?.role === "admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/login',
                    element: <LoginPage />
                },
                {
                    element: <ProtectedRoute />,
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
                        },
                        {
                            path: '/dashboard',
                            element: <DashboardPage />
                        },
                        {
                            element: <AdminRoute />,
                            children: [
                                {
                                    path: '/admin/users',
                                    element: <AdminManagementPage resource="users" />
                                },
                                {
                                    path: '/admin/countries',
                                    element: <AdminManagementPage resource="countries" />
                                },
                                {
                                    path: '/admin/organizations',
                                    element: <AdminManagementPage resource="organizations" />
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ])

const Router = () => <RouterProvider router={router} />

export default Router