/**
 * Structure that represents a shopping cart
 */
export class Cart {
  constructor() {
    this.items = [];
  }

  add(item) {
    const existing = this.items.find((i) => i.name === item.name);
    if (existing) existing.quantity++;
    else this.items.push({ ...item, quantity: 1 });
  }

  remove(index) {
    this.items.splice(index, 1);
  }

  updateQuantity(index, quantity) {
    if (quantity < 1) quantity = 1;
    this.items[index].quantity = quantity;
  }

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
