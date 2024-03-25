import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home.tsx'
import { Pages } from './store/pages.ts'
import { Admin } from './Pages/Admin.tsx'
import { Register } from './Pages/Register.tsx'
import { Login } from './Pages/Login.tsx'
import { WaitForStart } from './Pages/WaitForStart.tsx'
import { SoloTest } from './Pages/SoloTest.tsx'

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
          <Route path={Pages.SoloTest} Component={SoloTest} />
        </Routes>
      </Router>
      <div>alerts</div>
    </>
  )
}
