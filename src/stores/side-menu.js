import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/",
        title: "Products",
      },
      {
        icon: "ShoppingCart",
        pathname: "/cart",
        title: "Checkout",
      },
    ],
  },
});

export { sideMenu };
