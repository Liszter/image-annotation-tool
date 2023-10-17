import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="home-container">
        home

        <Link to="about">toAbout</Link>
        <Link to="clock">toClock</Link>

    </div>
  );
}
