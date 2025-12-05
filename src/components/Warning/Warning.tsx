import "./Warning.css";

export function Warning({ count }: { count: number }) {
  return (
    <div className="warning">
      The team has {count} players. Add more to reach 11.
    </div>
  );
}
