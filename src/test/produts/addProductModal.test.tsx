import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
// 1. Add this import to get the matchers
import { AddProductModal } from "../../Pages/Products/modals/AddProductModal";
import { Provider } from "react-redux";
import { store } from "../../store";
import type { IAddOrUpdateProductModalProps } from "../../types/products/product-ui";

const renderAddProductModal = (props: IAddOrUpdateProductModalProps) => {
  render(
    <Provider store={store}>
      <AddProductModal {...props} />
    </Provider>,
  );
};

describe("Add or Update Product Modal", () => {
  it("should render the modal when isShowModal is true", () => {
    renderAddProductModal({ isShowModal: true, onModalClose: vi.fn() });
    expect(screen.queryByText("Add Product")).toBeInTheDocument();
  });

  it("should not render the modal when isShowModal is false", () => {
    renderAddProductModal({ isShowModal: false, onModalClose: vi.fn() });
    expect(screen.queryByText("Add Product")).not.toBeInTheDocument();
  });

  it("should render the update modal when product is present", () => {
    renderAddProductModal({
      isShowModal: true,
      onModalClose: vi.fn(),
      product: {
        id: 1,
        name: "Test Product",
        price: 10,
        qty: 5,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    expect(screen.queryByText("Update Product")).toBeInTheDocument();
  });
});
