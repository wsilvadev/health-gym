import { Contexts } from 'src/contexts'
import Routes from 'src/router/routes'

export function App(): JSX.Element {
  return (
    <Contexts>
      <Routes />
    </Contexts>
  )
}
