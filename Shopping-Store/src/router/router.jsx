import {createBrowserRouter} from "react-router";
import Shop from "../pages/Shop";
import Root from "../pages/Root";
import SignupForm from "../pages/SignupForm";
import Login from "../pages/Login";
import AddProductForm from "../pages/ProductAddForm";
import PrivateAdminRoute from "../components/PrivateAdminRouter";
import Cart from "../pages/Cart";


export const router = createBrowserRouter([
    {path:'/', element: <Root />, children:[
        {path: '/', element: <Shop/>},
        {path: '/sign-up', element: <SignupForm/>},
        {path: '/login', element: <Login />},
        {path: '/add-product', element: (
            <PrivateAdminRoute>
                <AddProductForm />
            </PrivateAdminRoute>
            )},
        {path: '/cart', element: <Cart />}
    ]},
])