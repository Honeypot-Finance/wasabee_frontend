import { observer } from "mobx-react-lite";
import {
  WrappedNextModal,
  WrappedNextModalContent,
  WrappedNextModalBody,
} from "../wrappedNextUI/Modal/Modal";

import { popmodal } from "@/services/popmodal";

export const PopOverModal = observer(() => {
  return (
    <WrappedNextModal
      isOpen={popmodal.open}
      onClose={() => {
        popmodal.closeModal();
      }}
    >
      <WrappedNextModalContent>
        <WrappedNextModalBody>{popmodal.modalContent}</WrappedNextModalBody>
      </WrappedNextModalContent>
    </WrappedNextModal>
  );
});

export default PopOverModal;
