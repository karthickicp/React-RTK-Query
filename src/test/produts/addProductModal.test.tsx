import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

// 1. Add this import to get the matchers
import { AddProductModal } from "../../Pages/Products/modals/AddProductModal";
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

  it("should close the modal when onModalClose is called", async () => {
    const onModalClose = vi.fn();
    const user = userEvent.setup();
    renderAddProductModal({ isShowModal: true, onModalClose: onModalClose });
    const cancelBtn = screen.getByTestId("add-product-cancel-button");
    await user.click(cancelBtn);
    expect(onModalClose).toHaveBeenCalledTimes(1);
  });

  it("should be an empty value when the modal is opened for adding a new product", () => {
    renderAddProductModal({ isShowModal: true, onModalClose: vi.fn() });
    const nameInput = screen.getByLabelText("Name");
    const priceInput = screen.getByLabelText("Price");
    const qtyInput = screen.getByLabelText("Quantity");
    const categorySelect = screen.getByLabelText("Category");
    expect(nameInput).toHaveValue("");
    expect(priceInput).toHaveValue(0);
    expect(qtyInput).toHaveValue(0);
    expect(categorySelect).toHaveValue("");
  });

  it("should have the correct values when the modal is opened for updating a product", () => {
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
    const nameInput = screen.getByLabelText("Name");
    const priceInput = screen.getByLabelText("Price");
    const qtyInput = screen.getByLabelText("Quantity");
    // const categorySelect = screen.getByLabelText("Category");
    expect(nameInput).toHaveValue("Test Product");
    expect(priceInput).toHaveValue(10);
    expect(qtyInput).toHaveValue(5);
    // expect(categorySelect).toHaveValue("1");
  });
});
