import {
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalContentProps,
  ModalProps,
} from "@nextui-org/react";

export function WrappedNextModal(props: ModalProps) {
  return (
    <Modal
      {...props}
      classNames={{
        base: "bg-[#271A0C] border-[#F0E7D8] border-2",
        ...props.classNames,
      }}
    ></Modal>
  );
}

export function WrappedNextModalContent(props: ModalContentProps) {
  return <ModalContent {...props}></ModalContent>;
}

export function WrappedNextModalBody(props: ModalBodyProps) {
  return <ModalBody {...props}></ModalBody>;
}
