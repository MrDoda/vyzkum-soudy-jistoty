import { useTests } from '../hooks/useTests.ts'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'
import { SoloTestInfo } from '../Components/SoloTestInfo.tsx'

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
        <p className={'box'}>
          <SoloTestInfo />
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
