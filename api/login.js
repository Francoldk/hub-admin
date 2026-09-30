export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user, password } = req.body || {};

  const USER = process.env.HUB_USER;
  const PASS = process.env.HUB_PASS;

  if (user === USER && password === PASS) {
    // Cookie simple, válida 7 días
    const token = Buffer.from(`${USER}:${Date.now()}`).toString("base64");
    res.setHeader(
      "Set-Cookie",
      `hub_auth=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`
    );
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: "Credenciales inválidas" });
}