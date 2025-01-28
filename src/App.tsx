// import './App.css'

import { Toaster } from "sonner"
import ForgotPasword from "./pages/Auth/ForgotReset/ForgotPasword"
import { ResetPassword } from "./pages/Auth/ForgotReset/ResetPassword"
import { Login } from "./pages/Auth/login/Login"
import Register from "./pages/Auth/register/Register"

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-400", success: "text-green-400", warning: "text-yellow-700", info: "bg-blue-400",
          },
        }} />
        {/* <RouterProvider */}

      {/* <Register /> */}
      {/* <Login /> */}
      {/* <ForgotPasword /> */}
      {/* <ResetPassword /> */}
    </>
  )
}

export default App
