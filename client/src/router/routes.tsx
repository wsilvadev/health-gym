import { useRecoilValue } from 'recoil'

import { authentication } from 'src/atoms'
import { ForgotPassword } from 'src/screens/account/forgot-password'
import { SignIn } from 'src/screens/account/sign-in'
import { SignUp } from 'src/screens/account/sign-up'
import { Blog } from 'src/screens/blog'
import { Dashboard } from 'src/screens/dashboard'
import { Exercise } from 'src/screens/exercise'
import { History } from 'src/screens/history'
import { Home } from 'src/screens/home'
import { Profile } from 'src/screens/profile'
import { MainLayout } from 'src/views/layouts/main'

import { Navigate, Route, Router, Routes } from '.'

export default (): JSX.Element => {
  const logged = !!useRecoilValue(authentication).user.email

  const publicRoutes = (
    <>
      <Route path="" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </>
  )

  const privateRoutes = (
    <Route path="" element={<MainLayout />}>
      <Route path="" element={<Home />} />
      <Route path="blog" element={<Blog />} />
      <Route path="exercise" element={<Exercise />} />
      <Route path="history" element={<History />} />
      <Route path="profile" element={<Profile />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )

  return (
    <Router>
      <Routes>
        {logged ? privateRoutes : publicRoutes}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
