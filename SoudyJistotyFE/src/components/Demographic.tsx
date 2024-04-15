import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser.ts'
import { Pages } from '../store/pages.ts'

export const Demographic = () => {
  const [age, setAge] = useState('')
  const [universityName, setUniversityName] = useState('')
  const [studyProgram, setStudyProgram] = useState('')
  const [yearOfStudy, setYearOfStudy] = useState('1')
  const [studioType, setStudioType] = useState('')

  const [personalUJEP, setPersonalUJEP] = useState('')
  const [userUJEPid, setUserUJEPid] = useState('')
  const [ujep, setUjep] = useState(false)

  const isDisabled =
    !age || !universityName || !studyProgram || !yearOfStudy || !studioType

  const { setDemographic } = useUser()
  const navigate = useNavigate()

  const onContinue = async () => {
    const allDemo = {
      age,
      universityName,
      studyProgram,
      yearOfStudy,
      studioType,
      personalUJEP,
      userUJEPid,
    }
    console.log('allDemo', allDemo)

    if (await setDemographic(allDemo)) {
      navigate(Pages.Pandas)
    }
  }

  const toggleUjep = (event: any) => {
    setUjep(event.target.value === 'ano')
  }

  console.log('ujep', ujep)

  return (
    <>
      <div className="container box" id="user_key_form">
        <h2 className="title is-4">Demografické údaje</h2>
        <div className="field">
          <label className="label">Napište Váš věk</label>
          <div className="control">
            <input
              name="age"
              className="input userKey"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Na jaké univerzitě studujete</label>
          <div className="control">
            <input
              name="uni"
              className="input userKey"
              type="text"
              value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Jaký studijní program studujete</label>
          <div className="control">
            <input
              name="studyProgram"
              className="input userKey"
              type="text"
              value={studyProgram}
              onChange={(e) => setStudyProgram(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Ročník studia:</label>
          <div className="control">
            <input
              name="studyProgram"
              className="input userKey"
              placeholder="např.: Bc. 1 rok"
              type="text"
              value={yearOfStudy}
              onChange={(e) => setYearOfStudy(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Jaký typ studia studujete</label>
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="studioType"
                onChange={() => setStudioType('prezencni')}
              />
              Prezenční
            </label>
            <label className="radio">
              <input
                type="radio"
                name="studioType"
                onChange={() => setStudioType('kombinovane')}
              />
              Kombinované
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">Jste studentem UJEP?</label>
          <div className="control">
            <label className="radio">
              <input
                id="ujep_ne"
                type="radio"
                name="ujep"
                value="ne"
                checked={!ujep}
                onChange={toggleUjep}
              />
              NE
            </label>
            <label className="radio">
              <input
                id="ujep_ano"
                type="radio"
                name="ujep"
                value="ano"
                checked={ujep}
                onChange={toggleUjep}
              />
              ANO
            </label>
          </div>
        </div>

        {ujep && (
          <>
            <div className="field">
              <label className="label">
                <strong>Uveďte svá identifikační čísla:</strong>
              </label>
            </div>
            <div className="field">
              <label className="label">1. Osobní číslo (např. P174098)</label>
              <div className="control">
                <input
                  name="personalUJEP"
                  className="input userKey"
                  type="text"
                  value={personalUJEP}
                  onChange={(e) => setPersonalUJEP(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">
                2. Uživatelské UJEP ID (např. st40320)
              </label>
              <div className="control">
                <input
                  name="userUJEPid"
                  className="input userKey"
                  type="text"
                  value={userUJEPid}
                  onChange={(e) => setUserUJEPid(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        <div id="submit">
          <div className="field">
            <button
              onClick={onContinue}
              className="button is-primary"
              disabled={isDisabled}
            >
              Vytvořit a Pokračovat
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
