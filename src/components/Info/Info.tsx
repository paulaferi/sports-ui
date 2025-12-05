import "./Info.css";

export function Info({ count }: { count: number }) {
  return <div className="info">Squad complete: {count} players.</div>;
}
