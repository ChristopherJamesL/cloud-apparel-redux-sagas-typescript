import { Fragment } from 'react';
import { Outlet, Link } from 'react-router';

import { ReactComponent as ClowdLogo } from '../../assets/cloud-svgrepo-com.svg'

import './navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className='navigation' >
                <Link className='logo-container' to={'/'} >
                    <ClowdLogo className='logo' />
                </Link>
                <div className='nav-links-container' >
                    <Link className='nav-link' to={'/shop'} >SHOP</Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
  };

  export default Navigation;