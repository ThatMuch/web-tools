import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/analyse-refonte-site-web">Analyse Refonte Site Web</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
