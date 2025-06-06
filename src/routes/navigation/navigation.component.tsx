import { Fragment } from 'react';
import { Outlet } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon  from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as ClowdLogo } from '../../assets/cloud-sun-svgrepo-com.svg';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { signOutStart } from '../../store/user/user.action';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());

    return (
        <Fragment>
            <NavigationContainer >
                <LogoContainer to={'/'} >
                    <ClowdLogo className='logo' />
                </LogoContainer>
                <NavLinks >
                    <NavLink to={'/shop'} >SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser} >SIGN OUT</NavLink>
                    ) : (
                        <NavLink to={'/auth'} >SIGN IN</NavLink>
                    )}
                    <CartIcon  />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer >
            <Outlet />
        </Fragment>
    );
  };

  export default Navigation;