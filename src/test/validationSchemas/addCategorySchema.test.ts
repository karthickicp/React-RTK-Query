import { describe, expect, it } from "vitest";
import { addCategorySchema } from "../../helpers/validationSchema";

describe("Category validation schema - edge cases", () => {
  it("should fail when name is an empty string", () => {
    const category = {
      name: "",
    };
    const result = addCategorySchema.safeParse(category);
    expect(result.success).toBe(false);
  });
  it("should valid when valid object is provided", () => {
    const category = {
      name: "Category 1",
    };
    const result = addCategorySchema.safeParse(category);
    console.log(result);
    expect(result.success).toBe(true);
  });
});
