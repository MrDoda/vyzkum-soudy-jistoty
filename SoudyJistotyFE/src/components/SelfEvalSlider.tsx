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
          <p className="is-size-4">
            Kdyby v tomto testu někdo náhodně hádal odpovědi, uhodl by přibližně
            polovinu odpovědí správně. Na kolik si věříte, že jste odpověděli
            správně ?
          </p>
          <div className="slider-container" style={{ padding: '20px' }}>
            <input
              className="slider is-fullwidth"
              style={{ width: '100%', maxWidth: '300px' }}
              step="1"
              min="50"
              max="100"
              value={selfEval || 75}
              onChange={(e) => onSelfEvalChange(Number(e.target.value))}
              type="range"
            />
            <p>Sebehodnocení: {selfEval}%</p>
          </div>
          <p> Vyberte na škále od 50% (hádám) do 100% (jsem si zcela jistý).</p>
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
