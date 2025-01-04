import { makeAutoObservable } from "mobx";

class PopModal {
  open: boolean = false;
  boarderLess: boolean = false;
  modalContent: React.ReactNode = "This is a PopOver Modal";
  actions: {
    label: string;
    onPress: () => void;
  }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  openModal({
    content,
    actions,
    boarderLess,
  }: {
    content: React.ReactNode;
    actions?: PopModal["actions"];
    boarderLess?: boolean;
  }) {
    if (content) {
      this.setModalContent(content);
    }
    this.actions = actions || [];
    this.open = true;
    this.boarderLess = boarderLess || false;
  }

  closeModal() {
    this.open = false;
  }

  setModalContent(content: React.ReactNode) {
    this.modalContent = content;
  }
}

export const popmodal = new PopModal();
