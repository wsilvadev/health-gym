import { Avatar, Box, Flex, Text } from 'native-base'

type Props = {
  showProfileInfo?: boolean
}

export function Profile({ showProfileInfo }: Props) {
  return (
    <Flex flexDir="row" align="center">
      {showProfileInfo ? (
        <Box mr="4" textAlign="right">
          <Text color="gray.100">Jardel Bordignon</Text>
          <Text color="gray.300" fontSize="sm">
            jardel1101@gmail.com
          </Text>
        </Box>
      ) : null}

      <Avatar size="md" source={{ uri: 'https://github.com/jardelbordignon.png' }} />
    </Flex>
  )
}
