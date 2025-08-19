/**
 * Renders the store page
 */
export class StoreRenderer {
  constructor(store, cart) {
    this.store = store;
    this.cart = cart;
    this.itemsContainer = document.getElementById("items-container");
    this.cartContainer = document.getElementById("cart-items");
    this.totalContainer = document.getElementById("total");
  }

  renderStoreItems() {
    this.itemsContainer.innerHTML = "";
    for (const key in this.store.items) {
      const item = this.store.items[key];
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <span class="item-name">${item.name}</span>
        <span class="item-price">$${item.price.toFixed(2)}</span>
        <div class="item-description">${item.description}</div>
        <button>Add to Cart</button>
      `;
      div.querySelector("button").addEventListener("click", () => {
        this.cart.add(item);
        this.renderCart();
      });
      this.itemsContainer.appendChild(div);
    }
  }

  renderCart() {
    this.cartContainer.innerHTML = "";
    const items = this.cart.items;

    items.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        <input type="number" min="1" value="${
          item.quantity
        }" data-index="${idx}">
        <button data-index="${idx}">Remove</button>
      `;
      this.cartContainer.appendChild(div);

      // Quantity change
      div.querySelector("input").addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        this.cart.updateQuantity(idx, val);
        this.renderCart();
      });

      // Remove item
      div.querySelector("button").addEventListener("click", (e) => {
        this.cart.remove(idx);
        this.renderCart();
      });
    });

    this.totalContainer.textContent = `Total: $${this.cart
      .getTotal()
      .toFixed(2)}`;
  }
}
