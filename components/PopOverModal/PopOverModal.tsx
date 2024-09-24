import { observer } from "mobx-react-lite";
import {
  WrappedNextModal,
  WrappedNextModalContent,
  WrappedNextModalBody,
} from "../wrappedNextUI/Modal/Modal";

import { popmodal } from "@/services/popmodal";
import { ModalFooter } from "@nextui-org/react";
import { Button } from "../button";

export const PopOverModal = observer(() => {
  return (
    <WrappedNextModal
      isOpen={popmodal.open}
      onClose={() => {
        popmodal.closeModal();
      }}
    >
      <WrappedNextModalContent className="md:max-w-[min(1024px,80vw)] max-h-[80vh] overflow-y-auto">
        <WrappedNextModalBody className="max-h-[80vh]">
          {popmodal.modalContent}
        </WrappedNextModalBody>
        {!!popmodal.actions?.length && (
          <ModalFooter>
            {popmodal.actions.map((action) => (
              <Button key={action.label} onPress={action.onPress}>
                {action.label}
              </Button>
            ))}
          </ModalFooter>
        )}
      </WrappedNextModalContent>
    </WrappedNextModal>
  );
});

export default PopOverModal;
