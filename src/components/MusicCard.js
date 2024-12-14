import React from 'react'
import styled from '@emotion/styled'
import { sendTrackDataToMockAPI } from '../components/utils/api_calls'

const CardWrapper = styled.div`
  position: relative;

  &:hover {
    cursor: pointer;

    .hover-container {
      opacity: 1;
    }
  }

  .hover-container {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  & .img-container {
    background-color: #1c1c1c;
    color: #e2e8f0;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 120px;
    position: relative;
  }

  & p {
    margin-bottom: 0;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .text-container {
    margin-top: 12px;
  }

  .favorite-controls {
    position: absolute;
    right: 3%;
    top: 3%;
    z-index: 200;
    display: flex;
  }

  .delete {
    margin-left: 5px;
  }
`

const MusicCard = ({
  title,
  artistName,
  imgUrl,
  track,
  isFavorite,
  onDelete,
  onEdit,
  onView
}) => {
  return (
    <CardWrapper>
      <div className="img-container">
        {isFavorite ? (
          <div className="favorite-controls">
            <span
              className="material-symbols-outlined material-symbols-outlined font16"
              onClick={onView}
            >
              visibility
            </span>
            <span
              className="material-symbols-outlined font16 delete"
              onClick={onEdit}
            >
              edit
            </span>
            <span
              className="material-symbols-outlined font16 delete"
              onClick={onDelete}
            >
              delete
            </span>
          </div>
        ) : (
          <div
            className="hover-container"
            onClick={() => sendTrackDataToMockAPI(track)}
          >
            <span className="material-symbols-outlined ">add</span>
            <p>Add to playlist</p>
          </div>
        )}

        <img src={imgUrl} alt={title} />
      </div>
      <div className="text-container">
        <p className="font14 ">{title}</p>
        <p className="font13 text-ternary">{artistName}</p>
      </div>
    </CardWrapper>
  )
}

export default MusicCard
