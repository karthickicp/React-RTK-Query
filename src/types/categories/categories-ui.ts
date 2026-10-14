import type { ICategories } from "./categories-reducer";

export interface IAddOrEditCategoryModalProps {
  isShowModal: boolean;
  onModalClose: () => void;
  category?: ICategories | null;
}
