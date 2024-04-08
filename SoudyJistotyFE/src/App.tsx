import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home.tsx'
import { Pages } from './store/pages.ts'
import { Admin } from './Pages/Admin.tsx'
import { Register } from './Pages/Register.tsx'
import { Login } from './Pages/Login.tsx'
import { WaitForStart } from './Pages/WaitForStart.tsx'
import { SoloTest } from './Pages/SoloTest.tsx'
import { WaitForStartDuo } from './Pages/WaitForStartDuo.tsx'
import { DuoTest } from './Pages/DuoTest.tsx'
import { ThatsAll } from './Pages/ThatsAll.tsx'
import { Pandas } from './Components/Pandas.tsx'
import { Demographic } from './Components/Demographic.tsx'
import { InformedDialog } from './Components/InformedDialog.tsx'
import { AfterDuoQuestions } from './Components/AfterDuoQuestions.tsx'

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={Pages.Admin} Component={Admin} />
          <Route path={Pages.Home} Component={Home} />
          <Route path={Pages.UserCreate} Component={Register} />
          <Route path={Pages.UserLogin} Component={Login} />
          <Route path={Pages.WaitStart} Component={WaitForStart} />
          <Route path={Pages.WaitStartDuo} Component={WaitForStartDuo} />
          <Route path={Pages.DuoTest} Component={DuoTest} />
          <Route path={Pages.SoloTest} Component={SoloTest} />
          <Route path={Pages.FinishedTest} Component={ThatsAll} />
          <Route path={Pages.Pandas} Component={Pandas} />
          <Route path={Pages.Demographic} Component={Demographic} />
          <Route path={Pages.InformedDialog} Component={InformedDialog} />
          <Route
            path={Pages.AfterTestQuestions}
            element={<AfterDuoQuestions />}
          />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </>
  )
}
