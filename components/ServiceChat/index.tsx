import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerServiceChat from "./Chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="z-10">
      {isOpen ? (
        <div className="fixed bottom-0 right-0 w-full sm:w-[450px] md:w-[550px]">
          <CustomerServiceChat onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          size="icon"
          className="fixed bottom-1 right-1 w-12 h-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 bg-yellow-300"
        >
          <MessageCircle className="h-6 w-6 " />
          <span className="sr-only">QA</span>
        </Button>
      )}
    </div>
  );
}
