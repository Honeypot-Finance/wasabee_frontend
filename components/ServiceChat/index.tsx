import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerServiceChat from "./Chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="absolute bottom-0 right-0 w-full sm:w-[450px] md:w-[550px]">
          <CustomerServiceChat onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">打开客服对话</span>
        </Button>
      )}
    </div>
  );
}
