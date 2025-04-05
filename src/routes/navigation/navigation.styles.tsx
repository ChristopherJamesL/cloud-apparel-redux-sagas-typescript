import styled from "styled-components";

import { Link, LinkProps } from 'react-router-dom';
import { ComponentProps } from "react";

export const NavigationContainer = styled.div`
    height: 70px; 
    width: 100%; 
    display: flex; 
    justify-content: space-between; 
    margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
    height: 100%; 
    width: 70px; 
    padding: 25px; 
`;

export const NavLinks = styled.div`
    width: 50%; 
    height: 100%; 
    display: flex; 
    align-items: center; 
    justify-content: flex-end; 
`;

type NavLinkProps = {
    as?: React.ElementType;
} & ComponentProps<'a'> & Partial<LinkProps>;

export const NavLink = styled(Link).attrs<NavLinkProps>(({ to }) => ({
    to: to || '#', // Fallback for when used as span
  }))<NavLinkProps>`
    padding: 10px 15px; 
    cursor: pointer; 
  `;

