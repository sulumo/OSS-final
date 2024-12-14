import React, { useState } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'

const Wrapper = styled.section`
  background: #111;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
`

const Input = styled.input`
  background: #1c1c1c;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 15px;
  outline: none;
  border: none;
  &:disabled {
    color: #a0aec0;
  }
`

const TextArea = styled.textarea`
  background: #1c1c1c;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 15px;
  outline: none;
  border: none;
`

const Button = styled.button`
  background: #3bdad3;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #1c9e96;
    cursor: not-allowed;
  }

  &:hover {
    background: #33c4bd;
  }
`

const ButtonSecondary = styled.button`
  background: #ffffff;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background: #1c9e96;
    cursor: not-allowed;
  }

  &:hover {
    background: #afafaf;
  }
`

const CloseButton = styled.button`
  background: none;
  color: #e2e8f0;
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #a0aec0;
  }
`

const EditModal = ({ track, onSave, onClose }) => {
  const [personalNote, setPersonalNote] = useState(track.personalNote || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSaveChanges = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.put(
        `https://67288011270bd0b97555c189.mockapi.io/Playlist/${track.id}`,
        { ...track, personalNote }
      )

      onSave(response.data)
      onClose()
    } catch (err) {
      setError('Failed to save changes. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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
        <Wrapper className="modal-content">
          <div className="modal-header border-0 d-flex justify-content-between border-none">
            <h6 className="modal-title">Edit Track</h6>
            <CloseButton type="button" onClick={onClose}>
              <span className="material-symbols-outlined text-secondary font18">
                close
              </span>
            </CloseButton>
          </div>
          <div className="modal-body border-0">
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
              <div className="form-group">
                <label>Track Name</label>
                <Input type="text" value={track.trackName} disabled />
              </div>
              <div className="form-group">
                <label>Artist Name</label>
                <Input type="text" value={track.artistName} disabled />
              </div>
              <div className="form-group">
                <label>Popularity</label>
                <Input type="text" value={track.popularity} disabled />
              </div>
              <div className="form-group">
                <label>Play Time</label>
                <Input type="text" value={track.playTime} disabled />
              </div>
              <div className="form-group">
                <label>Personal Note</label>
                <TextArea
                  rows={5}
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer border-0">
            <ButtonSecondary type="button" onClick={onClose}>
              Close
            </ButtonSecondary>
            <Button
              type="button"
              onClick={handleSaveChanges}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Wrapper>
      </div>
    </div>
  )
}

export default EditModal
