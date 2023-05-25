import { atom } from "recoil";
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const cart = atom({
  key: "cart",
  default: {
    request_id: null,
    paid: false,
    products: [],
    total: 0,
    product_ids: [],
    },
    effects: [localStorageEffect("cart")],
});

export { cart };
