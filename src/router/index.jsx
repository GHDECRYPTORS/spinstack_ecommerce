import Cart from "../views/cart/Main";
import Products from "../views/products/Main";
import SideMenu from "../layouts/side-menu/Main";
import SimpleMenu from "../layouts/simple-menu/Main";
import TopMenu from "../layouts/top-menu/Main";
import { useRoutes } from "react-router-dom";

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/",
          element: <Products />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
    // {
    //   path: "/simple-menu",
    //   element: <SimpleMenu />,
    //   children: [
    //     {
    //       path: "page-1",
    //       element: <Page1 />,
    //     },
    //     {
    //       path: "page-2",
    //       element: <Page2 />,
    //     },
    //   ],
    // },
    // {
    //   path: "/top-menu",
    //   element: <TopMenu />,
    //   children: [
    //     {
    //       path: "page-1",
    //       element: <Page1 />,
    //     },
    //     {
    //       path: "page-2",
    //       element: <Page2 />,
    //     },
    //   ],
    // },
  ];

  return useRoutes(routes);
}

export default Router;
