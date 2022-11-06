import { createBrowserRouter } from "react-router-dom";
import Main from "../../LayOuts/Main";
import CheckOut from "../../Pages/CheckOut/CheckOut";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import Register from "../../Pages/Register/Register";
import PrivateRoutes from "../PrivateRoutes";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/checkout/:id',
            element:<PrivateRoutes><CheckOut></CheckOut></PrivateRoutes>,
            loader:({params})=>fetch(`https://genius-car-server-coral-chi.vercel.app/services/${params.id}`)

        },
        {
          path:'/orders',
          element:<PrivateRoutes><Orders></Orders></PrivateRoutes>
      },
      ]
    },
  ]);