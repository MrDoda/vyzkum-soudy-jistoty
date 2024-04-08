import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'
import { useUser } from '../hooks/useUser.ts'

export const AfterDuoQuestions = () => {
  const [theoryOfCertainty, setTheoryOfCertainty] = useState('')
  const [theoryOfCertaintyDetails, setTheoryOfCertaintyDetails] = useState('')
  const [preStudy, setPreStudy] = useState('')
  const [preStudyDetails, setPreStudyDetails] = useState('')
  const [decisionBasis, setDecisionBasis] = useState('')
  const [otherDecisionBasis, setOtherDecisionBasis] = useState('')

  const navigate = useNavigate()
  const { setAfterTestQuestions } = useUser()

  const isDisabled =
    !theoryOfCertainty ||
    (preStudy === 'Ano' && !preStudyDetails) ||
    (!decisionBasis && theoryOfCertainty === 'Ano') ||
    (decisionBasis === 'Jinak' && !otherDecisionBasis)

  const onContinue = async () => {
    const feedback = {
      theoryOfCertainty: `${theoryOfCertainty}; ${theoryOfCertaintyDetails}`,
      preStudy: `${preStudy}; ${preStudyDetails}`,
      decisionBasis: `${decisionBasis}; ${otherDecisionBasis}`,
    }

    await setAfterTestQuestions(feedback)

    navigate(Pages.FinishedTest)
  }

  return (
    <>
      <div className="container box">
        <h2 className="title is-4">Zpětná vazba</h2>

        <div className="field">
          <label className="label">Znáte teorii soudů jistoty?</label>
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="theoryOfCertainty"
                onChange={() => setTheoryOfCertainty('Ano')}
              />
              Ano
            </label>
            <label className="radio">
              <input
                type="radio"
                name="theoryOfCertainty"
                onChange={() => setTheoryOfCertainty('Ne')}
              />
              Ne
            </label>
          </div>
        </div>

        {theoryOfCertainty === 'Ano' && (
          <div className="field">
            <label className="label">
              Pokud ano, zkuste pospat teorii jednoduše vlastními slovy
            </label>
            <div className="control">
              <textarea
                className="textarea"
                value={theoryOfCertaintyDetails}
                onChange={(e) => setTheoryOfCertaintyDetails(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="field">
          <label className="label">
            Zjišťoval/a jste si něco o této studii předem?
          </label>
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="preStudy"
                onChange={() => setPreStudy('Ano')}
              />
              Ano
            </label>
            <label className="radio">
              <input
                type="radio"
                name="preStudy"
                onChange={() => {
                  setPreStudy('Ne')
                  setPreStudyDetails('')
                }}
              />
              Ne
            </label>
          </div>
        </div>

        {preStudy === 'Ano' && (
          <div className="field">
            <label className="label">Pokud ano, co?</label>
            <div className="control">
              <textarea
                className="textarea"
                value={preStudyDetails}
                onChange={(e) => setPreStudyDetails(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="field">
          <label className="label">
            Pokud nastala neshoda, podle čeho jste se rozhodoval/a?
          </label>
          <div className="control">
            <div className="select">
              <select
                value={decisionBasis}
                onChange={(e) => setDecisionBasis(e.target.value)}
              >
                <option value="">Vyberte</option>
                <option value="Převážně jsem přikládal větší váhu své odpovědi">
                  Převážně jsem přikládal větší váhu své odpovědi
                </option>
                <option value="Převážně jsem přikládal větší váhu odpovědi druhého z dvojice">
                  Převážně jsem přikládal větší váhu odpovědi druhého z dvojice
                </option>
                <option value="Jinak">Rozhodoval jsem se jinak</option>
              </select>
            </div>
          </div>
        </div>

        {decisionBasis === 'Jinak' && (
          <div className="field">
            <label className="label">Pokud jinak, jak?</label>
            <div className="control">
              <textarea
                className="

textarea"
                value={otherDecisionBasis}
                onChange={(e) => setOtherDecisionBasis(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="field">
          <button
            onClick={onContinue}
            className="button is-primary"
            disabled={isDisabled}
          >
            Pokračovat
          </button>
        </div>
      </div>
    </>
  )
}
