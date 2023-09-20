import React from 'react';

const Header = () => {
  return (
    <header id="header"   >
      <nav className="navbar navbar-default navbar-fixed-top menu"  >
        <div className="container"  style={{ background: 'black' }}>
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar">vvvvvvvvvvvvv</span>
              <span className="icon-bar"> cccccccccccc</span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="index-register.html">
              {/* Resize the logo image */}
              <img src="/images/1_1ITmyv6jeV3OEST4_7xHUA.jpg" alt="logo" style={{ width: '150px', height: 'auto' }} />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right main-menu">
              {/* Dropdown menus and list items */}
            </ul>
            <form className="navbar-form navbar-right hidden-sm">
              <div className="form-group">
                <i className="icon ion-android-search"></i>
                <input type="text" className="form-control" placeholder="Search friends, photos, videos" />
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
