export default async function handler(req: any, res: any) {
  try {
    // @ts-expect-error - bundled file created during build
    const { default: app } = await import("../artifacts/api-server/dist/app.mjs");
    return app(req, res);
  } catch (err: any) {
    console.error("Failed to load app:", err);
    res.status(500).json({ 
      error: "Failed to initialize API", 
      message: err.message,
      stack: err.stack 
    });
  }
}
