import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'
import { useDuoTests } from '../hooks/useDuoTests.ts'
import { DuoTestInfo } from '../Components/DuoTestInfo.tsx'

export const WaitForStartDuo = () => {
  const { isTestRunning } = useDuoTests()

  const navigate = useNavigate()

  const onStartClick = async () => {
    const isRunning = await isTestRunning()
    if (isRunning) {
      navigate(Pages.DuoTest)
    } else {
      console.error('isNotRunning')
    }
  }
  return (
    <>
      <div className="container box" id="user_key_form">
        <h2 className="title is-4">
          Přečtěte si instrukce a pokračujte v experimentu
          <br />
          Druhý respondent k Vám bude automaticky přidělen.
        </h2>
        <p className={'box'}>
          <DuoTestInfo />
        </p>

        <div id="submit">
          <div className="field">
            <button
              onClick={onStartClick}
              className="button is-fullwidth is-primary"
            >
              Instrukce jsem přečetl(a); Pokračovat v experimentu
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
