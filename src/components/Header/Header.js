import './Header.css';
const Header = () => {
  return (
    <div>
      <a href="!#">
        <span onClick={() => window.scroll(0, 0)} className="header">
          Entertainment Center
        </span>
      </a>
    </div>
  );
};

export default Header;
