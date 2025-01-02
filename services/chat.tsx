import { makeAutoObservable } from "mobx";

class ChatService {
  chatIsOpen = false;
  messages: Message[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  clearChat() {
    this.messages = [];
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

  agentMessage(message: string | React.ReactNode) {
    this.messages.push({
      id: this.messages.length + 1,
      text: message,
      sender: "agent",
    });
  }

  userMessage(message: string | React.ReactNode) {
    this.messages.push({
      id: this.messages.length + 1,
      text: message,
      sender: "user",
    });
  }

  toggleChat() {
    this.chatIsOpen = !this.chatIsOpen;
  }

  setChatIsOpen(isOpen: boolean) {
    this.chatIsOpen = isOpen;
  }

  getChatIsOpen() {
    return this.chatIsOpen;
  }

  getQuestionRelatedPages(page: string) {
    return questionRelatedPages[page];
  }

  findRelatedQuestionsByPath(path: string) {
    let questions: questionTitles[] | undefined = undefined;
    let paths = path.split("/");

    while (paths.length > 0) {
      const currentPath = paths.join("/");
      const currentQuestions = questionRelatedPages[currentPath];
      if (currentQuestions) {
        questions = currentQuestions;
        break;
      }
      paths.pop();
    }

    return questions;
  }

  getPresetQuestions() {
    return presetQuestions;
  }
}

export type Message = {
  id: number;
  text: string | React.ReactNode;
  sender: "user" | "agent";
};

export type presetQuestionType = {
  quesiton: questionTitles;
  answer: React.ReactNode;
};

export const chatService = new ChatService();

export type questionTitles =
  | "How to Swap Tokens?"
  | "Tips for Liquidity Pools"
  | "Pot2Pump Processing State"
  | "Pot2Pump Success State"
  | "Pot2Pump Failed State";

export const questionRelatedPages: Record<string, questionTitles[]> = {
  "/swap": ["How to Swap Tokens?"],
  "/pools": ["Tips for Liquidity Pools"],
  "/pot2pump": [
    "Pot2Pump Processing State",
    "Pot2Pump Success State",
    "Pot2Pump Failed State",
  ],
  "/launch-detail": [
    "Pot2Pump Processing State",
    "Pot2Pump Success State",
    "Pot2Pump Failed State",
  ],
};

export const presetQuestions: Record<questionTitles, presetQuestionType> = {
  "How to Swap Tokens?": {
    quesiton: "How to Swap Tokens?",
    answer: (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">How to Swap Tokens?</h2>
        <ol className="list-decimal *:ml-5">
          <li>
            Select &quot;From&quot; Token: Choose the token you want to sell
            from the dropdown menu.
          </li>
          <li>Select &quot;To&quot; Token: Pick the token you want to buy.</li>
          <li>
            Confirm Amount: Input the desired amount to swap, and double-check
            the details.
          </li>
          <li>
            Approve &amp; Swap: Confirm the transaction in your wallet and
            initiate the swap.
          </li>
          <li>
            Wait for Confirmation: The transaction will process on-chain. This
            may take a few moments depending on network activity.
          </li>
          <li>
            Receive Tokens: Once completed, your new tokens will be credited to
            your wallet!
          </li>
        </ol>
      </div>
    ),
  },
  "Tips for Liquidity Pools": {
    quesiton: "Tips for Liquidity Pools",
    answer: (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Tips for Liquidity Pools</h2>
        <ol className="list-decimal *:ml-5">
          <li>
            Understanding Liquidity Pools: Liquidity pools allow you to earn
            rewards by providing pairs of tokens (e.g., Token A and Token B). In
            return, you receive LP (Liquidity Provider) tokens, which represent
            your share in the pool.
          </li>
          <li>
            Providing Liquidity: Select the token pair and input equal value
            amounts for both tokens. Confirm and approve the transaction in your
            wallet. Stake the LP tokens to earn additional rewards if
            applicable.
          </li>
        </ol>
      </div>
    ),
  },
  "Pot2Pump Processing State": {
    quesiton: "Pot2Pump Processing State",
    answer: (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Pot2Pump Processing State</h2>
        <ol className="list-decimal *:ml-5">
          <li>
            During this phase, users can deposit the raise token (e.g., ETH,
            USDT) into the project. into the project.
          </li>
          <li>
            Deposits accumulate until the project&apos;s minimum cap is reached.
          </li>
          <li>
            You can monitor the total raised amount in real time on the project
            detail page.
          </li>
          <li>
            Key Action: Deposit tokens to participate in the Meme Token launch.
          </li>
        </ol>
      </div>
    ),
  },
  "Pot2Pump Success State": {
    quesiton: "Pot2Pump Success State",
    answer: (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Pot2Pump Success State</h2>
        <ol className="list-decimal *:ml-5">
          <li>
            Once the project hits its minimum cap, the state changes to
            &quot;Success.&quot;
          </li>
          <li>At this point:</li>
          <li>Deposits are locked.</li>
          <li>
            Users can visit the project detail page to claim their LP tokens
            (representing their share of the Meme Token liquidity pool) in
            exchange for their deposited raise tokens.
          </li>
          <li>Key Action: Claim your LP tokens on the detail page.</li>
        </ol>
      </div>
    ),
  },
  "Pot2Pump Failed State": {
    quesiton: "Pot2Pump Failed State",
    answer: (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Pot2Pump Failed State</h2>
        <ol className="list-decimal *:ml-5">
          <li>
            If the project does not meet its minimum cap before the end time,
            the launch moves to the &quot;Failed&quot; state.
          </li>
          <li>In this case:</li>
          <li>
            Depositors are eligible for a full refund of their raise tokens.
          </li>
          <li>
            Refunds can be initiated and claimed on the project detail page.
          </li>
          <li>Key Action: Refund your deposit on the detail page.</li>
        </ol>
      </div>
    ),
  },
};
