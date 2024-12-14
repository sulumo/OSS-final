import React from 'react'
import styled from '@emotion/styled'

const ViewModal = ({ track, onClose }) => {
  if (!track) return null

  const Wrapper = styled.section`
    background: #111;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 10px;
    border: none;

    & .image-container {
      width: 100%;
      height: 300px;
      position: relative;
      border-radius: 10px;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  `

  const CloseButton = styled.button`
    background: none;
    color: #e2e8f0;
    border: none;
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    top: 3%;
    right: 3%;

    &:hover {
      color: #a0aec0;
    }
  `

  return (
    <div
      className="modal fade show d-block"
      role="dialog"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <div className="modal-dialog" role="document">
        <Wrapper className="modal-content p-0">
          <div className="modal-header border-0 d-flex justify-content-between p-0">
            <div className="image-container">
              <img src={track.image} alt="image" />
              <CloseButton type="button" onClick={onClose}>
                <span className="material-symbols-outlined text-secondary font24">
                  close
                </span>
              </CloseButton>
            </div>
          </div>
          <div className="modal-body border-0 px-4">
            <p>
              <strong>Track Name:</strong> {track.trackName}
            </p>
            <p>
              <strong>Artist Name:</strong> {track.artistName}
            </p>
            <p>
              <strong>Popularity:</strong> {track.popularity}
            </p>
            <p>
              <strong>Play Time:</strong> {track.playTime}
            </p>
            <p>
              <strong>Personal Note:</strong> {track.personalNote || 'None'}
            </p>
          </div>
        </Wrapper>
      </div>
    </div>
  )
}

export default ViewModal
