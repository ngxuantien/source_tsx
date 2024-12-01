import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/photos">
        <h1 className="font-bold text-2xl">Unsplash Gallery</h1>
      </Link>
    </header>
  );
};

export default Header;
