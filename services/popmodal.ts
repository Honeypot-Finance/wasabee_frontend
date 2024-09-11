import { makeAutoObservable } from "mobx";

class PopModal {
  open: boolean = false;
  modalContent: React.ReactNode = "This is a PopOver Modal";

  constructor() {
    makeAutoObservable(this);
  }

  openModal({ content }: { content: React.ReactNode }) {
    if (content) {
      this.setModalContent(content);
    }
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }

  setModalContent(content: React.ReactNode) {
    this.modalContent = content;
  }
}

export const popmodal = new PopModal();
