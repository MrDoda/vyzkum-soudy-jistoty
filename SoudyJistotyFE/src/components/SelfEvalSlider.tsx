import React from 'react'

interface SelfEvalSliderProps {
  selfEval?: number
  onSelfEvalChange: (value: number) => void
  onAnswer: () => void
  isDisabled?: boolean
}

const SelfEvalSlider: React.FC<SelfEvalSliderProps> = ({
  selfEval,
  onSelfEvalChange,
  onAnswer,
  isDisabled,
}) => {
  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      <div className="container">
        <div className="box">
          <p className="is-size-4">
            Kdyby v tomto testu někdo náhodně hádal odpovědi, uhodl by přibližně
            třetinu odpovědí správně. Pokud tento náhodný výběr je na škále
            označen jako 30 a 100 reprezentuje bezchybný výběr, jak si na této
            škále vedete vy?
          </p>
          <div className="slider-container" style={{ padding: '20px' }}>
            <input
              className="slider is-fullwidth"
              style={{ width: '100%', maxWidth: '300px' }}
              step="1"
              min="30"
              max="100"
              value={selfEval || 65}
              onChange={(e) => onSelfEvalChange(Number(e.target.value))}
              type="range"
            />
            <p>Sebehodnocení: {selfEval}%</p>
          </div>
          <p> Vyberte na škále od 30% (hádám) do 100% (jsem si zcela jistý).</p>
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <button
          disabled={!selfEval || isDisabled}
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
