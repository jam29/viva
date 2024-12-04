
const fetch = require("node-fetch");

const PORT = 3000;


 
async function getAccessToken() {
  const response = await fetch("https://demo-accounts.vivapayments.com/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "69upvpezosc0e06egvbwjwh19qgcmyd3y9wembj0cn260.apps.vivapayments.com", //  Client ID
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

let accessToken = await getAccessToken();

// Route ce creation de paiement
  try {
    // appel de viva wallet
    const response = await fetch("https://demo-api.vivapayments.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Viva Wallet token
      },
      body: JSON.stringify({
        amount: 500, // montznt en cents
        customerTrns: "Payment for order",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      
      res.json({ orderCode: data.orderCode });
    } else {
      res.status(500).json({ error: data.message || "Failed to create order." });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error." });
  }


 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
