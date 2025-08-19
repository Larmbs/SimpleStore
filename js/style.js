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
    document.querySelectorAll("h1, h2").forEach((h) => {
      h.style.color = s.headingColor || s.textColor || "black";
    });

    // Buttons
    document.querySelectorAll("button").forEach((btn) => {
      btn.style.backgroundColor = s.buttonBackground || "#007BFF";
      btn.style.color = s.buttonTextColor || "#fff";
      btn.style.border = `1px solid ${s.borderColor || "#000"}`;
      btn.style.padding = s.buttonPadding || "5px 10px";
      btn.style.borderRadius = s.buttonRadius || "4px";
      btn.style.cursor = "pointer";
    });

    // Items and cart-items
    document.querySelectorAll(".item, .cart-item").forEach((el) => {
      el.style.border = `1px solid ${s.borderColor || "#ccc"}`;
      el.style.marginBottom = s.spacing || "10px";
      el.style.padding = s.spacing || "10px";
      el.style.backgroundColor = s.itemBackground || "#fff";
      el.style.borderRadius = s.itemRadius || "6px";
    });

    // Container for items
    const container = document.getElementById("items-container");
    if (container) {
      container.style.backgroundColor =
        s.containerBackground || "transparent";
      container.style.padding = s.containerPadding || "10px";
    }

    // Search box + Tag filter
    const searchBox = document.getElementById("search-box");
    const tagFilter = document.getElementById("tag-filter");
    [searchBox, tagFilter].forEach((input) => {
      if (input) {
        input.style.padding = s.inputPadding || "8px";
        input.style.fontSize = s.inputFontSize || "14px";
        input.style.border = `1px solid ${s.borderColor || "#ccc"}`;
        input.style.borderRadius = s.inputRadius || "4px";
        input.style.backgroundColor = s.inputBackground || "#fff";
        input.style.color = s.inputTextColor || s.textColor || "black";
      }
    });

    // Feedback banner
    const feedback = document.getElementById("cart-feedback");
    if (feedback) {
      feedback.style.backgroundColor =
        s.feedbackBackground || s.buttonBackground || "#1976d2";
      feedback.style.color = s.feedbackTextColor || "#fff";
      feedback.style.padding = s.feedbackPadding || "10px 15px";
      feedback.style.borderRadius = s.feedbackRadius || "5px";
      feedback.style.fontFamily = s.fontFamily || "Arial, sans-serif";
    }
  }
}
