import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './pages/Auth/home/Welcome.tsx'
import Register from './pages/Auth/register/Register.tsx'
import { Login } from './pages/Auth/login/Login.tsx'
import ForgotPasword from './pages/Auth/ForgotReset/ForgotPasword.tsx'
import ResetPassword from './pages/Auth/ForgotReset/ResetPassword.tsx'
import { persistedStore, store } from './app/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
    errorElement: <div>404</div>,
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'forgot-password',
    element: <ForgotPasword />
  },
  {
    path: 'reset-password',
    element: <ResetPassword />
  },

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
