import { logo } from "../assets";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full mb-6 pt-3">
      <img src={logo} alt="sumz-logo" className="object-contain w-28" />
      <button
        type="button"
        onClick={() =>
          window.open("https://github.com/BeshoyMorad/AI-Summarizer")
        }
        className="black-btn"
      >
        GitHub
      </button>
    </nav>
  );
};

export default Navbar;
