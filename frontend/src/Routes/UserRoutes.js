import Home from "../components/Home";
import Products from "../components/Products";

export const user_routes = [
    {
        path:"/",
        element:<Home/>,
        role:"user"
    },
    {
        path:"/products",
        element:<Products/>,
        role:"user"
    },
]