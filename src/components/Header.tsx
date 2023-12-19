const Header = () => {
  const menus = ["About us", "Product", "Features", "Pricing"];
  return (
    <>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
          <a href="#">
            <span className="sr-only">WABS</span>
            <img alt="logo" className="h-16 w-20 sm:h-16" src="/next.svg" />
          </a>
          <div className="ml-10 pr-4 space-x-8">
            {menus.map((menu) => (
              <a
                key={menu}
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                {menu}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
