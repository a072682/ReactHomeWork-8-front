

import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import Index from "../pages";
import ProductsPage from "../pages/ProductsPage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/cartPage";
import Checkout from "../pages/checkout";
import CheckoutIn from "../pages/checkout-1";
import CheckoutSuccess from "../pages/checkoutSuccess";




const router = createHashRouter([ //createHashRouter為建立router的方法
	{
		path:"/",
		element: <FrontLayout />,
		children:[
            {
                path: "",
                element: <Index />,
            },
            {
                path: "ProductsPage",
                element: <ProductsPage />,
            },
            {
                path: "DetailPage/:id_first",
                element: <DetailPage />,
            },
            {
                path: "CartPage",
                element: <CartPage />,
            },
        ],
	},
    {
        path: "/Checkout",
        element: <Checkout />,
    },
    {
        path: "/CheckoutIn",
        element: <CheckoutIn />,
    },
    {
        path: "/CheckoutSuccess",
        element: <CheckoutSuccess />,
    },
])
export default router;