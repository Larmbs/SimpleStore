/**
 * Redirects user to making purchase with PayPal
 * @param {String} account - your PayPal.me username
 * @param {number} price - total amount
 */
export function PayPalPayment(account, price) {
  window.location.href = `https://www.paypal.com/paypalme/${account}/${price.toFixed(
    2
  )}`;
}

/**
 * Redirects user to making purchase with Venmo
 * @param {String} account - your Venmo username
 * @param {number} price - total amount
 * @param {String} note - description of the purchase
 */
export function VenmoPayment(account, price, note = "Purchase from MyStore") {
  const encodedNote = encodeURIComponent(note);
  window.location.href = `https://venmo.com/${account}?txn=pay&amount=${price.toFixed(
    2
  )}&note=${encodedNote}`;
}

/**
 * Provides instructions for Zelle payment
 * @param {String} emailOrPhone - your Zelle email or phone number
 * @param {number} price - total amount
 * @param {String} note - description of the purchase
 */
export function ZellePayment(emailOrPhone, price, note = "") {
  alert(
    `Send $${price.toFixed(2)} via Zelle to ${emailOrPhone}\nNote: ${note}`
  );
}
