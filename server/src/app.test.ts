import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "./app";

test("GET /health responde ok", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.status, "ok");
});

test("GET /Vehicular/:zona exige token cuando AUTH_ENABLED=true", async () => {
  process.env.AUTH_ENABLED = "true";
  process.env.JWT_SECRET = "secret-test";

  const response = await request(app).get("/Vehicular/Multired");

  assert.equal(response.status, 401);
  assert.equal(response.body.error.code, "AUTH_REQUIRED");

  process.env.AUTH_ENABLED = "false";
});

test("GET /Vehicular/:zona valida page y pageSize", async () => {
  process.env.AUTH_ENABLED = "true";
  process.env.JWT_SECRET = "secret-test";

  const token = jwt.sign({ sub: "test-user" }, process.env.JWT_SECRET);

  const response = await request(app)
    .get("/Vehicular/Multired?page=0&pageSize=10")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(response.status, 400);
  assert.equal(response.body.error.code, "VALIDATION_ERROR");

  process.env.AUTH_ENABLED = "false";
});
