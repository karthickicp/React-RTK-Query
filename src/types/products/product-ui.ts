import type { IProduct } from "./products-reducer";

export interface IAddOrUpdateProductModalProps {
  isShowModal: boolean;
  onModalClose: () => void;
  product?: IProduct | null;
}
