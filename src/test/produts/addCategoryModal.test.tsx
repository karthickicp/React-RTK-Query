import { Provider } from "react-redux";
import { store } from "../../store";
import { AddOrEditCategoryModal } from "../../Pages/Categories/Modals/AddOrEditCategoryModal";
import { render, screen } from "@testing-library/react";
import type { IAddOrEditCategoryModalProps } from "../../types/categories/categories-ui";
import { expect, it, vi } from "vitest";
import { describe } from "vitest";
import userEvent from "@testing-library/user-event";

const renderAddCategoryModal = (props: IAddOrEditCategoryModalProps) => {
  render(
    <Provider store={store}>
      <AddOrEditCategoryModal {...props} />
    </Provider>,
  );
};

describe("AddOrEditCategoryModal", () => {
  it("renders the modal when isShowModal is true", () => {
    renderAddCategoryModal({ isShowModal: true, onModalClose: vi.fn() });
    expect(screen.queryByText("Add Category")).toBeInTheDocument();
  });
  it("does not render the modal when isShowModal is false", () => {
    renderAddCategoryModal({ isShowModal: false, onModalClose: vi.fn() });
    expect(screen.queryByText("Add Category")).not.toBeInTheDocument();
  });
  it("renders the update modal when category is present", () => {
    renderAddCategoryModal({
      isShowModal: true,
      onModalClose: vi.fn(),
      category: {
        id: 1,
        name: "Category 1",
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    expect(screen.queryByText("Edit Category")).toBeInTheDocument();
  });
  it("should close the modal when onModalClose is called", async () => {
    const onModalClose = vi.fn();
    renderAddCategoryModal({ isShowModal: true, onModalClose: onModalClose });
    const cancelBtn = screen.getByTestId("add-category-cancel-button");
    await userEvent.click(cancelBtn);
    expect(onModalClose).toHaveBeenCalledTimes(1);
  });
  it("should be an empty value when the modal is opened for adding a new category", () => {
    renderAddCategoryModal({ isShowModal: true, onModalClose: vi.fn() });
    const nameInput = screen.getByLabelText("Category Name");
    expect(nameInput).toHaveValue("");
  });
  it("should be a valid value when the modal is opened for editing a category", () => {
    renderAddCategoryModal({
      isShowModal: true,
      onModalClose: vi.fn(),
      category: {
        id: 1,
        name: "Category 1",
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    const nameInput = screen.getByLabelText("Category Name");
    expect(nameInput).toHaveValue("Category 1");
  });
});
