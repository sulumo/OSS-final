import React from 'react'
import styled from '@emotion/styled'
import { sendTrackDataToMockAPI } from '../components/utils/api_calls'

const BannerWrapper = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 280px;
  position: relative;

  & .top-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 1;
    border-radius: 10px;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* object-position: 20% 20%; */
    border-radius: 10px;
    opacity: 1;
  }

  & .text-container {
    position: absolute;
    bottom: 5%;
    left: 3%;
    z-index: 100;
  }

  .add-container {
    display: flex;
    justify-content: center;
    position: absolute;
    right: 3%;
    bottom: 5%;
    z-index: 100;
    cursor: pointer;
  }

  .block {
    display: block;
  }

  .primary {
    color: #3bdad3 !important;
  }

  .ternary {
    color: #939393;
  }
`

const CardBanner = ({ title, artistName, listeners, imgUrl, track }) => {
  return (
    <BannerWrapper>
      <div className="top-container"></div>
      <img src={imgUrl} alt="" />
      <div className="text-container">
        <span className=' block font24 text-secondary "'>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </span>
        <span className=' font15 text-ternary "'>
          {artistName}
          {'  '}
          &#9679;
          {'  '}
        </span>
        <span className="font13 text-ternary">{listeners} listeners</span>
      </div>
      <div
        className="add-container text-ternary"
        onClick={() => sendTrackDataToMockAPI(track)}
      >
        <span className="align-self-center"> Add to Favorites</span>
        <span className="material-symbols-outlined font17 align-self-center">
          add
        </span>
      </div>
    </BannerWrapper>
  )
}

export default CardBanner
