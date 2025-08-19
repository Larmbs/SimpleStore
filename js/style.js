/**
 * Structure that applies json-defined store styling to the HTML
 */
export class StyleManager {
  constructor(store) {
    this.store = store;
  }

  applyStoreStyles() {
    if (!this.store.style) return;
    const s = this.store.style;

    // Body styles
    document.body.style.backgroundColor = s.backgroundColor || "white";
    document.body.style.color = s.textColor || "black";
    document.body.style.fontFamily = s.fontFamily || "Arial, sans-serif";

    // Headings
    document.querySelectorAll("h1, h2").forEach(h => {
      h.style.color = s.headingColor || s.textColor;
    });

    // Buttons
    document.querySelectorAll("button").forEach(btn => {
      btn.style.backgroundColor = s.buttonBackground || "#007BFF";
      btn.style.color = s.buttonTextColor || "#fff";
      btn.style.border = `1px solid ${s.borderColor || "#000"}`;
      btn.style.padding = s.spacing || "5px 10px";
    });

    // Items and cart-items
    document.querySelectorAll(".item, .cart-item").forEach(el => {
      el.style.borderColor = s.borderColor || "#ccc";
      el.style.marginBottom = s.spacing || "10px";
      el.style.padding = s.spacing || "10px";
    });

    // Container for items
    const container = document.getElementById("items-container");
    if (container) {
      container.style.backgroundColor = s.containerBackground || "transparent";
    }
  }
}
