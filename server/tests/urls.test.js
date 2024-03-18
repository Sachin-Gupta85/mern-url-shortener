const request = require("supertest");
const app = require("../src/app");

describe("url shortener API", () => {
  test("rejects non-http targets", async () => {
    expect((await request(app).post("/api/urls").send({ target: "ftp://x" })).status).toBe(400);
  });

  test("creates with a generated code", async () => {
    const res = await request(app).post("/api/urls").send({ target: "https://example.com" });
    expect(res.status).toBe(201);
    expect(res.body.code).toMatch(/^[0-9a-zA-Z]{6}$/);
    expect(res.body.clicks).toBe(0);
  });

  test("honours a custom code and rejects duplicates", async () => {
    expect((await request(app).post("/api/urls").send({ target: "https://a.com", code: "abc" })).status).toBe(201);
    expect((await request(app).post("/api/urls").send({ target: "https://b.com", code: "abc" })).status).toBe(409);
  });

  test("redirect increments clicks and 302s to target", async () => {
    await request(app).post("/api/urls").send({ target: "https://dest.com", code: "go" });
    const r = await request(app).get("/r/go");
    expect(r.status).toBe(302);
    expect(r.headers.location).toBe("https://dest.com");
    const info = await request(app).get("/api/urls/go");
    expect(info.body.clicks).toBe(1);
  });

  test("redirect 404 for unknown code", async () => {
    expect((await request(app).get("/r/missing")).status).toBe(404);
  });
});
