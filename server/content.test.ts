import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("content.get", () => {
  it("returns default content with zh, en, images, and social keys", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.get();

    // Should have all four top-level keys
    expect(result).toHaveProperty("zh");
    expect(result).toHaveProperty("en");
    expect(result).toHaveProperty("images");
    expect(result).toHaveProperty("social");
  });

  it("returns zh translations with required nav keys", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.get();

    expect(result.zh).toHaveProperty("nav.about");
    expect(result.zh).toHaveProperty("nav.experience");
    expect(result.zh).toHaveProperty("hero.tagline");
    expect(result.zh).toHaveProperty("about.title");
  });

  it("returns en translations with required nav keys", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.get();

    expect(result.en).toHaveProperty("nav.about");
    expect(result.en).toHaveProperty("hero.tagline");
  });

  it("returns images with logo and other image keys", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.get();

    expect(result.images).toHaveProperty("logo");
    expect(result.images).toHaveProperty("aboutTeam");
    expect(result.images).toHaveProperty("gelatoCart");
    expect(result.images).toHaveProperty("gelatoCup");
    expect(typeof result.images.logo).toBe("string");
    expect(result.images.logo).toMatch(/^https?:\/\//);
  });

  it("returns social links with instagram, facebook, email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.get();

    expect(result.social).toHaveProperty("instagram");
    expect(result.social).toHaveProperty("facebook");
    expect(result.social).toHaveProperty("email");
  });

  it("returns characters image URL", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.get();

    expect(result.images).toHaveProperty("characters");
    expect(result.images.characters).toMatch(/^https?:\/\//);
  });
});

describe("content.submitContact", () => {
  it("validates required email field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Should throw validation error with empty email
    await expect(
      caller.content.submitContact({
        name: "Test",
        email: "",
        message: "Hello",
      })
    ).rejects.toThrow();
  });

  it("validates required message field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Should throw validation error with empty message
    await expect(
      caller.content.submitContact({
        name: "Test",
        email: "test@example.com",
        message: "",
      })
    ).rejects.toThrow();
  });
});

describe("content.uploadImage", () => {
  it("validates required data field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Should throw validation error with missing fields
    await expect(
      // @ts-expect-error testing missing fields
      caller.content.uploadImage({
        filename: "test.png",
      })
    ).rejects.toThrow();
  });
});
