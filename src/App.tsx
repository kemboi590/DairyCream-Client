import { Toaster } from "sonner"

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
