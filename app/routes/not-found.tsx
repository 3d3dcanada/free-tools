import { Link } from "react-router";

export const meta = () => [{ title: "Page not found | 3D3D Free Tools" }];

export default function NotFound() {
  return (
    <main className="host-missing">
      <h1>Page not found</h1>
      <p>
        <Link to="/tools">Free tools</Link> · <Link to="/learn/academy">3D printing academy</Link>
      </p>
    </main>
  );
}
