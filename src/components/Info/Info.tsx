import { UI_MESSAGES } from "../../types";
export function Info({ count }: { count: number }) {
  return <div className="info">{UI_MESSAGES.teamComplete(count)}</div>;
}
