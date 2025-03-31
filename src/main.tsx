import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './pages/home/Welcome.tsx'
import Register from './pages/Auth/register/Register.tsx'
import { Login } from './pages/Auth/login/Login.tsx'
import ForgotPasword from './pages/Auth/ForgotReset/ForgotPasword.tsx'
import ResetPassword from './pages/Auth/ForgotReset/ResetPassword.tsx'
import { persistedStore, store } from './app/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import VerifyEmail from './pages/Auth/ForgotReset/VerifyEmail.tsx'
import About from './pages/about/About.tsx'
import Contact from './pages/contact/Contact.tsx'
import Error from './pages/Error.tsx'
import Main from './pages/dashboard/main/Main.tsx'
import MilkProduction from './pages/dashboard/main/milk/MilkProduction.tsx'
import Sales from './pages/dashboard/main/sales/Sales.tsx'
import Inventory from './pages/dashboard/main/inventory/Inventory.tsx'
import Visualization from './pages/dashboard/main/Visualization.tsx'
import Profile from './pages/dashboard/main/Profile.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import Livestock from './pages/dashboard/main/livestock/Livestock.tsx'
// import Livestock from './pages/dashboard/main/livestock/Livestock.tsx'
import FarmerLivestock from './pages/dashboard/main/livestock/FarmerLivestock.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
    errorElement: <Error />
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <Error />
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: 'forgot-password',
    element: <ForgotPasword />,
    errorElement: <Error />
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
    errorElement: <Error />
  },
  {
    path: 'verify-email',
    element: <VerifyEmail />,
    errorElement: <Error />
  },
  {
    path: 'about-us',
    element: <About />,
    errorElement: <Error />
  },
  {
    path: 'contact-us',
    element: <Contact />,
    errorElement: <Error />

  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'milk-production',
        element: <MilkProduction />
      },
      {
        path: 'sales',
        element: <Sales />
      },
      {
        path: 'inventory-management',
        element: <Inventory />
      },
      {
        path: 'visualization',
        element: <Visualization />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'livestock',
        element: <Livestock />,
      },
      {
        path: 'farmer-livestock',
        element: <FarmerLivestock />
      }

    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
