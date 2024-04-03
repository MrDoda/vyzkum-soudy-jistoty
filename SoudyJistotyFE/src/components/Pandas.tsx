import { useState } from 'react'
import './Pandas.css'
import { useUser } from '../hooks/useUser.ts'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'
const emotionsList = [
  { name: 'Čilý', value: 1 },
  { name: 'Provinilý', value: 2 },
  { name: 'Energický', value: 3 },
  { name: 'Ostražitý', value: 4 },
  { name: 'Stydět se', value: 5 },
  { name: 'Pozorný', value: 6 },
  { name: 'Strádání', value: 7 },
  { name: 'Nadšený', value: 8 },
  { name: 'Mít obavy', value: 9 },
  { name: 'Nepřátelský', value: 10 },
  { name: 'Inspirovaný', value: 11 },
  { name: 'Zaujatý (ve smyslu Zahloubaný)', value: 12 },
  { name: 'Podrážděný', value: 13 },
  { name: 'Roztěkaný', value: 14 },
  { name: 'Nervozní', value: 15 },
  { name: 'Hrdý', value: 16 },
  { name: 'Polekaný', value: 17 },
  { name: 'Silný', value: 18 },
  { name: 'Znepokojený', value: 19 },
  { name: 'Odhodlaný', value: 20 },
]

export const Pandas = () => {
  const [selectedValues, setSelectedValues] = useState<any>({})
  const { setPandas } = useUser()
  const navigate = useNavigate()

  const handleRadioChange = (emotion: any, value: any) => {
    setSelectedValues({ ...selectedValues, [emotion]: value })
  }

  const onPandasClick = async () => {
    if (Object.keys(selectedValues).length !== emotionsList.length) {
      alert('Vyplňte všechny hodnoty')
      return
    }
    if (await setPandas(selectedValues)) {
      navigate(Pages.WaitStart)
    }
  }

  return (
    <div className={'pandas'}>
      <div className="column has-text-centered has-border">
        <p className="title">
          Následující slova popisují různé pocity a emoce. Přečtěte si každou
          položku a označte, do jaké míry momentálně prožíváte tyto pocity.
        </p>
      </div>
      <div className="table-container sticky" style={{ borderRadius: 5 }}>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Pocit</th>
              <th>Neprožívám to vůbec</th>
              <th>Velmi slabě</th>
              <th>Slabě</th>
              <th>Mírně</th>
              <th>Středně</th>
              <th>Silně</th>
              <th>Velmi silně</th>
            </tr>
          </thead>
          <tbody>
            {emotionsList.map(({ name }, index) => (
              <tr key={index}>
                <td
                  className={`${selectedValues[name] ? 'has-background-grey-light' : ''}`}
                >
                  {name}
                </td>
                {Array.from({ length: 7 }, (_, i) => i + 1).map((val) => (
                  <td
                    key={val}
                    className={`${selectedValues[name] ? 'has-background-grey-light' : ''}`}
                    style={{ textAlign: 'center' }}
                  >
                    <label className="radio">
                      <input
                        type="radio"
                        name={name}
                        checked={selectedValues[name] === val}
                        onChange={() => handleRadioChange(name, val)}
                      />
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onPandasClick} className="button is-primary">
        Odeslat a Pokračovat
      </button>
    </div>
  )
}
