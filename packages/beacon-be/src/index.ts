import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // 本番と開発環境のURL
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/console/:count", (c) => {
  const count = c.req.param("count");
  console.log(count);
  return c.text("pushed!");
});
app.post("/console/:count", (c) => {
  const count = c.req.param("count");
  console.log(count);
  return c.text("pushed!");
});

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});
