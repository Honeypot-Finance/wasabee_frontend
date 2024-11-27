import { visualEffects } from "@/services/visualeffects";

export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <button
        onClick={() => {
          if (visualEffects.confetti_run === false) {
            visualEffects.confetti_run = true;
          } else {
            visualEffects.confetti_numberOfPieces += 200;
          }
        }}
      >
        Start Confetti
      </button>
    </div>
  );
}
