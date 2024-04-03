import { useTests } from '../hooks/useTests.ts'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'

export const WaitForStart = () => {
  const { isTestRunning } = useTests()

  const navigate = useNavigate()

  const onStartClick = async () => {
    const isRunning = await isTestRunning()
    if (isRunning) {
      navigate(Pages.SoloTest)
    } else {
      console.error('isNotRunning')
    }
  }
  return (
    <>
      <div className="container box" id="user_key_form">
        <h2 className="title is-4">Vyčkejte na znamení začít</h2>
        <p className={'subtitle'}>
          Tlačítko momentálně nic nedělá, až budou všichni připraveni dostanete
          pokyn ke startu experimentu.
        </p>

        <div id="submit">
          <div className="field">
            <button
              onClick={onStartClick}
              className="button is-fullwidth is-primary"
            >
              Začít experiment
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
