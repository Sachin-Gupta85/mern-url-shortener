import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App.jsx";

describe("URL Shortener App", () => {
  beforeEach(() => vi.restoreAllMocks());
  it("lists shortened urls with click counts", async () => {
    globalThis.fetch = vi.fn(() => Promise.resolve({
      ok: true, status: 200,
      json: async () => [{ id: "1", code: "go", target: "https://dest.com", clicks: 3 }],
    }));
    render(<App />);
    await waitFor(() => expect(screen.getByText("/r/go")).toBeInTheDocument());
    expect(screen.getByText(/3 clicks/)).toBeInTheDocument();
  });
});
