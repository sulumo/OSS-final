import React from 'react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

const NavigationWrapper = styled.nav`
  width: 18%;
`

const Logo = styled.div`
  margin-bottom: 65px;
`

const Navigation = () => {
  return (
    <NavigationWrapper className=" h-100">
      <Logo>
        <img src="/logo.svg" alt="logo" />
      </Logo>
      <div>
        <NavLink
          to="/"
          className={`d-flex flex-row text-decoration-none align-items-center w-100 font16 nav-link-margin`}
          style={({ isActive }) => ({
            color: isActive ? '#3BDAD3' : '#E2E8F0'
          })}
        >
          <span className=" material-symbols-outlined d-inline-block me-3 ">
            home
          </span>
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/explore"
          className="d-flex flex-row text-decoration-none align-items-center w-100 font16 nav-link-margin"
          style={({ isActive }) => ({
            color: isActive ? '#3BDAD3' : '#E2E8F0'
          })}
        >
          <span className=" material-symbols-outlined d-inline-block me-3">
            explore
          </span>
          <span>Explore</span>
        </NavLink>
        <NavLink
          to="/favorites"
          className="d-flex flex-row text-decoration-none align-items-center w-100 font16 nav-link-margin"
          style={({ isActive }) => ({
            color: isActive ? '#3BDAD3' : '#E2E8F0'
          })}
        >
          <span className=" material-symbols-outlined d-inline-block me-3">
            favorite
          </span>
          <span>Favorites</span>
        </NavLink>
      </div>
    </NavigationWrapper>
  )
}

export default Navigation
