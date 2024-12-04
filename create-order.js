
const fetch = require("node-fetch");

// Function to get access token
async function getAccessToken() {
  const response = await fetch("https://demo-accounts.vivapayments.com/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "69upvpezosc0e06egvbwjwh19qgcmyd3y9wembj0cn260.apps.vivapayments.com", // Client ID
      client_secret: "MzGSKzc3PRTi881s1Q2rewV086u7wG", // Client Secret
    }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("Access Token:", data.access_token);
    return data.access_token;
  } else {
    throw new Error(data.error_description || "Failed to get access token.");
  }
}

// Function to create a payment order
async function createOrder() {
  try {
    // Fetch access token
    const accessToken = await getAccessToken();

    // Call Viva Wallet API to create an order
    const response = await fetch("https://demo-api.vivapayments.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        amount: 500, // Amount in cents
        customerTrns: "Payment for order",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Order Created Successfully:", data.orderCode);
    } else {
      console.error("Error Creating Order:", data.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the createOrder function
createOrder();
