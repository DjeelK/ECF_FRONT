import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignForm from "./routes/auth/SignForm";
import ErrorPage from "./routes/ErrorPage";
import HomePage from "./routes/HomePage";
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
        path: "/imcroyable",
        element:<PageList1/>
        },
        {
        path: "/page2",
        element:<PageList2/>
        },
    ]
    }
])

export default router