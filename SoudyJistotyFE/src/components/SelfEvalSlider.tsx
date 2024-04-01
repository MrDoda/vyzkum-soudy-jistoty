import React from 'react'

interface SelfEvalSliderProps {
  selfEval?: number
  onSelfEvalChange: (value: number) => void
  onAnswer: () => void
}

const SelfEvalSlider: React.FC<SelfEvalSliderProps> = ({
  selfEval,
  onSelfEvalChange,
  onAnswer,
}) => {
  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      <div className="container">
        <div className="box">
          <p className="is-size-4">Nakolik jste si jisti předchozí odpovědi?</p>
          <div className="slider-container" style={{ padding: '20px' }}>
            <input
              className="slider is-fullwidth"
              style={{ width: '100%', maxWidth: '300px' }}
              step="1"
              min="50"
              max="100"
              value={selfEval}
              onChange={(e) => onSelfEvalChange(Number(e.target.value))}
              type="range"
            />
            <p>Self Evaluation: {selfEval}</p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <button
          disabled={!selfEval}
          className="button is-primary"
          onClick={onAnswer}
        >
          Pokračovat
        </button>
      </div>
    </div>
  )
}

export default SelfEvalSlider
