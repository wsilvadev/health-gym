import { Box, IconButton, useBreakpointValue } from 'native-base'
import { HouseLine } from 'phosphor-react-native'
import { Modal } from 'react-native'
import { useRecoilState } from 'recoil'

import { sidebarVisible } from 'src/atoms'

import { SidebarNav } from './nav'

export function Sidebar() {
  const isSmallVersion = useBreakpointValue({ base: true, md: false })
  const [visible, setVisible] = useRecoilState(sidebarVisible)

  const onClose = () => setVisible(false)

  if (isSmallVersion) {
    return (
      <Modal
        visible={visible}
        onRequestClose={onClose}
        animationType="slide"
        transparent>
        <Box bg="gray.800" borderRadius={['none', 'lg']} p="8" maxW={250} h="full">
          <IconButton
            alignSelf="flex-end"
            rounded="lg"
            colorScheme="orange"
            variant="ghost"
            _icon={{ as: HouseLine }}
            onPress={onClose}
          />
          <SidebarNav />
        </Box>
      </Modal>
    )
  }

  return (
    <Box w="56">
      <SidebarNav />
    </Box>
  )
}
