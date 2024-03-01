import { UnauthorizedLayout } from 'pages/layouts/UnauthorizedLayout'
import { AppRouter } from './providers/router'
import './styles/index.scss'

const App = () => {
  return (
    <UnauthorizedLayout className='app'>
      <AppRouter />
    </UnauthorizedLayout>
  )
}

export default App
