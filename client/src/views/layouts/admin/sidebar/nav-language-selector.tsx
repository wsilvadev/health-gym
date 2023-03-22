import { Box } from 'native-base'
//import { Select } from 'native-base'

import { useLocales } from 'src/hooks/use-locales'
import { LocaleName } from 'src/locales'
import { Select } from 'src/views/components'

export function NavLanguageSelector() {
  const { setLocaleName, localeName } = useLocales()

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Português', value: 'pt' },
  ]

  return (
    <Box maxW="130">
      {/* <Select
        selectedValue={localeName}
        // accessibilityLabel="Choose Language"
        // placeholder="Choose Language"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size={10} />,
        }}
        mt={1}
        onValueChange={value => setLocaleName(value as LocaleName)}>
        {localeNames.map(item => (
          <Select.Item
            key={item}
            label={`${localesLabel[item as LocaleName]}`}
            value={item}
          />
        ))}
      </Select> */}
      <Select
        label="Selecione"
        data={languages}
        selectedItem={languages.find(lang => lang.value === localeName) || undefined}
        onSelectItem={({ value }) => setLocaleName(value as LocaleName)}
      />
    </Box>
  )
}
