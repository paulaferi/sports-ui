import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <small>© {new Date().getFullYear()} Sports UI</small>
    </footer>
  );
}
