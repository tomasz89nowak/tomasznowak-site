import React from 'react';
import Link from 'next/link';


class Header extends React.Component {
  static getInitialProps({store, isServer}){
    return {};
  }

  getActive = (url) => {
    if(this.props.url === url){
      return 'active';
    }
    return '';
  };

  render(){
    return (
      <header className="main-header clearfix">
        <ul>
          <Link href="/">
            <li className={`${this.getActive('/')} ${this.getActive(undefined)}`}>
              <a>Homepage</a>
            </li>
          </Link>
          <Link href="/about">
            <li className={this.getActive('/about')}>
              <a>About me</a>
            </li>
          </Link>
        </ul>
      </header>
    )
  }
}

export default Header;