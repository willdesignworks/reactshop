import { NavLink, useLocation } from "react-router-dom";

function Navbar({ cartData, setCartOpen }) {

  const location = useLocation();

  return (
    <>
      <header
        id="header"
        className={`htc-header ${location.pathname === "/" ? "" : "header--3 bg__white"}`}
      >
        {/* Start Mainmenu Area */}
        <div id="sticky-header-with-topbar" className="mainmenu__area sticky__header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-2 col-lg-2 col-6">
                <div className="logo">
                  <NavLink to="/" className="nav-item me-4 nav-link">
                    <img src="https://s3cdn.yourator.co/companies/logos/000/001/468/thumb/e9c47e97d18d84edf8913f88d720a9f5e7fb562f.png" alt="logo images" />
                  </NavLink>
                </div>
              </div>
              {/* Start Mainmenu Area */}
              <div className="col-md-8 col-lg-8 d-none d-md-block">
                <nav className="mainmenu__nav">
                  <ul className="main__menu">
                    <li>
                      <NavLink to="/" className="nav-item me-4 nav-link">
                        首頁
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="about" className="nav-item me-4 nav-link">
                        品牌介紹
                      </NavLink>
                    </li>
                    <li className="drop">
                      <NavLink to="products" className="nav-item me-4 nav-link">
                        全部商品
                      </NavLink>
                      <ul className="dropdown">
                        <li><NavLink to="categoryshirts">服飾</NavLink></li>
                        <li><NavLink to="categorypants">褲子</NavLink></li>
                        <li><NavLink to="categorygoods">配件</NavLink></li>
                      </ul>
                    </li>
                    <li>
                      <NavLink to="store" className="nav-item me-4 nav-link">
                        門市資訊
                      </NavLink>
                    </li>
                  </ul>
                </nav>

                <div className="mobile-menu clearfix d-block d-lg-none">
                  <nav id="mobile_dropdown">
                    <ul>
                      <li>
                        <a href="index.html">Home</a>
                      </li>
                      <li><a href="about.html">About</a></li>
                      <li>
                        <a href="shop.html">Shop</a>
                        <ul>
                          <li><a href="index.html">Home 1</a></li>
                          <li><a href="index-2.html">Home 2</a></li>
                          <li><a href="index-3.html">Home 3</a></li>
                        </ul>
                      </li>
                      <li><a href="contact.html">contact</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              {/* End Mainmenu Area */}
              <div className="col-md-2 col-lg-2 col-6">  
                <ul className="menu-extra">
                  <li>
                    <NavLink to="/login" >
                    <span className="ti-user"></span>
                    </NavLink>
                  </li>
                  <li className="cart__menu position-relative"
                    onClick={() => setCartOpen(prev => !prev)}
                  >
                    <span className="ti-shopping-cart"></span>
                    {cartData?.carts?.length > 0 && (
                      <span className="bootstarplength">
                        {cartData.carts.length}
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="body__overlay"></div>
    </>
  );
}

export default Navbar;