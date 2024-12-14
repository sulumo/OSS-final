import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import styled from '@emotion/styled'
import SearchBar from './SearchBar'

const LayoutWrapper = styled.div`
  width: 90vw;
  height: 100vh;
  margin: 0 auto;

  & .header {
    position: sticky;
  }

  & .scroll {
    overflow-y: scroll;
  }
`

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Main = styled.main`
  width: 82%;
`

const Layout = () => {
  return (
    <LayoutWrapper className="d-flex flex-column align-items-center">
      <Section>
        <Navigation />
        <Main className=" h-100">
          <div className=" header d-flex flex-row mb-3">
            <SearchBar />
          </div>
          <Outlet className="scroll overflow-scroll" />
        </Main>
      </Section>

      {/* <Footer /> */}
    </LayoutWrapper>
  )
}

export default Layout
