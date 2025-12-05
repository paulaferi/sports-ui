import { UI_MESSAGES } from "../../types";
export function Warning({ count }: { count: number }) {
  return (
    <div className="warning" role="alert">
      {UI_MESSAGES.teamIncomplete(count)}
    </div>
  );
}
