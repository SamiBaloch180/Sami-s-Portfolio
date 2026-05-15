export default async function handler(req, res) {
  try {
    const { default: app } = await import("../artifacts/api-server/dist/app.mjs");
    return app(req, res);
  } catch (err) {
    console.error("Failed to load app:", err);
    res.status(500).json({ 
      error: "Failed to initialize API", 
      message: err.message,
      stack: err.stack 
    });
  }
}
