import { useLocales } from 'src/hooks/use-locales'

import { NavLanguageSelector } from './nav-language-selector'
import { NavLink } from './nav-link'
import { NavSection } from './nav-section'

export function SidebarNav() {
  const { t } = useLocales()

  return (
    <>
      <NavSection title={t('wGeneral')}>
        <NavLink icon="cog-outline" to="/">
          Dashboard
        </NavLink>
        <NavLink icon="account-multiple-outline" to="/users">
          Usuários
        </NavLink>
      </NavSection>

      <NavSection title={t('wConfiguration')} zIndex={1}>
        <NavLanguageSelector />
      </NavSection>

      <NavSection title={t('wGeneral')}>
        <NavLink icon="cog-outline" to="/">
          Dashboard
        </NavLink>
        <NavLink icon="account-multiple-outline" to="/users">
          Usuários
        </NavLink>
      </NavSection>
    </>
  )
}
