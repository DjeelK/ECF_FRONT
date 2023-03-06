import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignForm from "./routes/auth/SignForm";
import ProtectedRoute from "./routes/components/ProtectedRoute";
import ErrorPage from "./routes/ErrorPage";
import HomePage from "./routes/HomePage";
import CounterForm from "./routes/page1/CounterForm";
import PageList1 from "./routes/page1/PageList1";
import PageList2 from "./routes/page2/PageList2";




const router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
        path: "/",
        element: <HomePage/>
        },
        {
        path: "/auth",
        element: <SignForm />
        },
        {
        path: "/counters",
        element:<PageList1/>    
        },
        {
        path:"/counters/add",
        element:<ProtectedRoute><CounterForm/></ProtectedRoute>
        },
        {
        path:"/counters/edit/:counterId",
        element:<ProtectedRoute><CounterForm/></ProtectedRoute>
        },
        {
        path:"/counters/delete/:counterId",
        element:<ProtectedRoute><CounterForm/></ProtectedRoute>
        },
        {
        path: "/page2",
        element:<PageList2/>
        },
    ]
    }
])

export default router