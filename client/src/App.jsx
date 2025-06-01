import { Navigate, Route, Routes } from "react-router"
import Home from './pages/Home'
import Singup from './pages/Signup'
import Login from './pages/Login'
import Notification from './pages/Notification'
import Call from './pages/Call'
import Chats from './pages/Chats'
import Onboarding from './pages/Onboarding'
import { ToastContainer } from 'react-toastify';
import PageLoader from './components/PageLoader'
import useAuthUser from "./hooks/useAuthUser"
import Layout from "./components/Layout"
import { useThemeStore } from "./store/useThemeStore"

function App() {

  const { theme } = useThemeStore();

  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />


  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ?
          <Layout showSidebar>
            <Home />
          </Layout>
          : <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />} />
        <Route path="/signup" element={!isAuthenticated ? <Singup /> : <Navigate to='/' />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={isOnboarded ? '/' : '/onboarding'} />} />
        <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar>
            <Notification />
          </Layout>
        ) : <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />} />
        <Route path="/call/:id" element={isAuthenticated && isOnboarded ?
          <Call />
          : <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />} />
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ?
          <Layout showSidebar={false}>
            <Chats />
          </Layout>
          : <Navigate to={isAuthenticated ? '/login' : '/onboarding'} />} />
        <Route path="/onboarding" element={isAuthenticated ? (!isOnboarded ? <Onboarding /> : (<Navigate to='/' />)) : <Navigate to='/login' />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
