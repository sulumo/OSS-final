import React from 'react'
import styled from '@emotion/styled'
import { sendTrackDataToMockAPI } from '../components/utils/api_calls'

const ChartWrapper = styled.section`
  width: 100%;
  margin-bottom: 15px;
  background-color: #1c1c1c;
  padding: 10px;
  border-radius: 10px;

  & .image-container {
    width: 40px;
    height: 40px;
    background-color: #929292;
    border-radius: 5px;
    margin-right: 15px;
  }
  & .rank {
    margin-right: 15px;
    font-weight: bold;
  }

  & p {
    margin: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .add-container {
    cursor: pointer;
  }
`

const TopChartsCard = ({
  rank,
  title,
  artistName,
  imageUrl,
  listeners,
  track
}) => {
  return (
    <ChartWrapper className="d-flex flex-row align-items-between justify-content-between">
      <div className="d-flex flex-row align-items-center">
        <div className="image-container">
          <img src={imageUrl} alt="music image" />
        </div>
        <span className="rank">{rank}</span>
        <div className="">
          <p className="font14">{title}</p>
          <p className="font13 text-ternary">
            {artistName}{' '}
            <span className="text-four">&#8226; {listeners} listeners</span>
          </p>
        </div>
      </div>

      <div
        className="d-flex flex align-items-center justify-content-v text-ternary me-2 add-container"
        onClick={() => sendTrackDataToMockAPI(track)}
      >
        <span className="align-self-center"> Add</span>
        <span className="material-symbols-outlined font17 align-self-center">
          add
        </span>
      </div>
    </ChartWrapper>
  )
}

export default TopChartsCard
