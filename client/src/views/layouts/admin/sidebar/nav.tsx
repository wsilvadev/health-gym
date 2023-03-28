import { Gear, Users } from 'phosphor-react-native'

import { useLocales } from 'src/hooks/use-locales'

import { NavLanguageSelector } from './nav-language-selector'
import { NavLink } from './nav-link'
import { NavSection } from './nav-section'

export function SidebarNav() {
  const { t } = useLocales()

  return (
    <>
      <NavSection title={t('wGeneral')}>
        <NavLink icon={Gear} to="/">
          Dashboard
        </NavLink>
        <NavLink icon={Users} to="/users">
          Usuários
        </NavLink>
      </NavSection>

      <NavSection title={t('wConfiguration')} zIndex={1}>
        <NavLanguageSelector />
      </NavSection>

      <NavSection title={t('wGeneral')}>
        <NavLink icon={Gear} to="/">
          Dashboard
        </NavLink>
        <NavLink icon={Users} to="/users">
          Usuários
        </NavLink>
      </NavSection>
    </>
  )
}
