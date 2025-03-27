import jwt from "jsonwebtoken";

export default async function getAccessToken() {
  try {
    const encodedKey = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
    if (!encodedKey) throw new Error("Missing service key");

    const serviceAccountKey = JSON.parse(Buffer.from(encodedKey, "base64").toString("utf-8"));

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: createJWT(serviceAccountKey),
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) throw new Error("Failed to get access token");

    return tokenData.access_token;
  } catch (error: any) {
    console.error("Error getting access token:", error);
    return null;
  }
}

function createJWT(serviceAccount: any) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  return jwt.sign(payload, serviceAccount.private_key, { algorithm: "RS256" });
}
