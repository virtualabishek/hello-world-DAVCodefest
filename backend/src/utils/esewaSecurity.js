import crypto from "crypto";
/**
 * Generates a Base64-encoded HMAC SHA256 hash.
 *
 * @param {string} data - The data to be hashed.
 * @param {string} secret - The secret key used for hashing.
 * @returns {string} The Base64-encoded HMAC SHA256 hash.
 */
function generateHmacSha256Hash(data, secret) {
  if (!data || !secret) {
    throw new Error("Both data and secret are required to generate a hash.");
  }

  // Create HMAC SHA256 hash and encode it in Base64
  const hash = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64");

  return hash;
}

function safeStringify(obj) {
  const cache = new Set();
  const jsonString = JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return; // Discard circular reference
      }
      cache.add(value);
    }
    return value;
  });
  return jsonString;
}

export { generateHmacSha256Hash, safeStringify };
