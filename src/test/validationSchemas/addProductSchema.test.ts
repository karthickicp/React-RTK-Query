import { describe, expect, it } from "vitest";
import { addProductSchema } from "../../helpers/validationSchema";

describe("Product validation schema - edge cases", () => {
  it("should validate a valid product object", () => {
    const product = {
      name: "Product 1",
      price: 10.99,
      qty: 5,
      category_id: 1,
    };
    const result = addProductSchema.safeParse(product);
    expect(result.success).toBe(true);
  });

  it("should fail when name is not provided", () => {
    const product = {
      price: 10.99,
      qty: 5,
      category_id: 1,
    };
    const result = addProductSchema.safeParse(product);
    expect(result.success).toBe(false);
  });

  it("should fail when price is negative", () => {
    const product = {
      name: "Product 1",
      price: -10.99,
      qty: 5,
      category_id: 1,
    };
    const result = addProductSchema.safeParse(product);
    expect(result.success).toBe(false);
  });

  it("should fail when quantity is negative", () => {
    const product = {
      name: "Product 1",
      price: 10.99,
      qty: -5,
      category_id: 1,
    };
    const result = addProductSchema.safeParse(product);
    expect(result.success).toBe(false);
  });

  it("should fail when price is zero", () => {
    const product = {
      name: "Product 1",
      price: 0,
      qty: 5,
      category_id: 1,
    };
    const result = addProductSchema.safeParse(product);
    expect(result.success).toBe(false);
  });

  it("should fail when quantity is zero", () => {
    const product = {
      name: "Product 1",
      price: 10.99,
      qty: 0,
      category_id: 1,
    };
    const result = addProductSchema.safeParse(product);
    expect(result.success).toBe(false);
  });

  it("should fail when quantity is not available", () => {
    const product = {
      name: "Product 1",
      price: 10.99,
      category_id: 1,
    };
    const result = addProductSchema.safeParse(product);
    expect(result.success).toBe(false);
  });

  it("should fail when price is not available", () => {
    const product = {
      name: "Product 1",
      qty: 5,
      category_id: 1,
    };
    const result = addProductSchema.safeParse(product);
    expect(result.success).toBe(false);
  });

  it("should fail when category id is not available", () => {
    const product = {
      name: "Product 1",
      price: 10.99,
      qty: 5,
      category_id: undefined,
    };
    const result = addProductSchema.safeParse(product);
    expect(result.success).toBe(false);
  });
});
