import { StoreRenderer } from "./store.js";
import { StyleManager } from "./style.js";
import { PayPalPayment, VenmoPayment } from "./payment.js";
import { Cart } from "./cart.js";

const cart = new Cart();

// Get "store" query param from URL, fallback to default store.json
function getStoreUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("store") || "default_store.json";
}

const storeUrl = getStoreUrl();

fetch(storeUrl)
  .then((res) => res.json())
  .then((store) => {
    document.title = store.name + " | " + store.company;
    document.getElementById("store-name").textContent = store.name;

    const renderer = new StoreRenderer(store, cart);
    renderer.renderStoreItems();

    const styleManager = new StyleManager(store);
    styleManager.applyStoreStyles();

    // Purchase buttons
    document.getElementById("purchase-paypal").addEventListener("click", () => {
      if (cart.isEmpty()) return alert("Cart is empty!");
      const total = cart.getTotal();
      PayPalPayment(store.payment.paypal, total);
    });

    document.getElementById("purchase-venmo").addEventListener("click", () => {
      if (cart.isEmpty()) return alert("Cart is empty!");
      const total = cart.getTotal();
      VenmoPayment(store.payment.venmo, total);
    });
    
    document.getElementById("purchase-zelle").addEventListener("click", () => {
      if (cart.isEmpty()) return alert("Cart is empty!");
      const total = cart.getTotal();
      ZellePayment(store.payment.zelle, total, `Purchase at ${store.name}`);
    });
  })
  .catch((err) => console.error("Error loading store:", err));
