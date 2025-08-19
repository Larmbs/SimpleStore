import { StyleManager } from "./style.js";

export class StoreRenderer {
  constructor(store, cart) {
    this.store = store;
    this.cart = cart;
    this.styleManager = new StyleManager(store);;

    this.itemsContainer = document.getElementById("items-container");
    this.cartContainer = document.getElementById("cart-items");
    this.totalContainer = document.getElementById("total");
    this.feedback = document.getElementById("cart-feedback");

    // Optional filter elements
    this.searchBox = document.getElementById("search-box");
    this.tagFilter = document.getElementById("tag-filter");

    if (this.searchBox) {
      this.searchBox.addEventListener("input", () => this.renderStoreItems());
    }
    if (this.tagFilter) {
      this.tagFilter.addEventListener("change", () => this.renderStoreItems());
      this.populateTagFilter();
    }
  }

  /**
   * Populates the tag dropdown filter from store items
   */
  populateTagFilter() {
    const tags = new Set();
    Object.values(this.store.items).forEach((item) => {
      if (item.tags) item.tags.forEach((t) => tags.add(t));
    });

    tags.forEach((tag) => {
      const opt = document.createElement("option");
      opt.value = tag;
      opt.textContent = tag;
      this.tagFilter.appendChild(opt);
    });
  }

  /**
   * Renders all items, filtered by search and/or tag
   */
  renderStoreItems() {
    this.itemsContainer.innerHTML = "";

    const searchText = this.searchBox ? this.searchBox.value.toLowerCase() : "";
    const selectedTag = this.tagFilter ? this.tagFilter.value : "";

    for (const key in this.store.items) {
      const item = this.store.items[key];

      const matchesSearch = item.name.toLowerCase().includes(searchText);
      const matchesTag =
        !selectedTag || (item.tags && item.tags.includes(selectedTag));

      if (!matchesSearch || !matchesTag) continue;

      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <span class="item-name">${item.name}</span>
        <span class="item-price">$${item.price.toFixed(2)}</span>
        <div class="item-description">${item.description}</div>
        <div class="item-tags">${(item.tags || [])
          .map((t) => `<span class="tag">${t}</span>`)
          .join(" ")}</div>
        <button>Add to Cart</button>
      `;

      div.querySelector("button").addEventListener("click", () => {
        this.cart.add(item);
        this.renderCart();
        this.showCartFeedback(item)
      });

      this.itemsContainer.appendChild(div);
    }

    this.styleManager.applyStoreStyles();
  }

  /**
   * Renders cart contents with quantity editing + remove
   */
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

  showCartFeedback(item) {
    const count = this.cart.items.reduce((sum, i) => sum + i.quantity, 0);
    this.feedback.textContent = `${item.name} added! (${count} in cart)`;
    this.feedback.classList.add("show");

    // Small vibration if available
    if (navigator.vibrate) {
      navigator.vibrate([60, 30, 60]);
    }

    setTimeout(() => {
      this.feedback.classList.remove("show");
    }, 2000);
  }
}
