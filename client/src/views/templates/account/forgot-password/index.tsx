import { Center, Heading, Text, View } from 'native-base'

import { ZodType, useForm, useLocales } from 'src/hooks'
import { useNavigate } from 'src/router'
import { ForgotPasswordInput } from 'src/types/account'
import { Button, Input } from 'src/views/components'

import { AccountContainer } from '../container'

export function ForgotPasswordTemplate(): JSX.Element {
  const { t } = useLocales()
  const navTo = useNavigate()

  const { btnControl, handleSubmit, register } = useForm<ForgotPasswordInput>({
    defaultValues: { email: '' },
    zodSchema: (z: ZodType) =>
      z.object({
        email: z.string().email(),
      }),
  })

  const handleAuthentication = handleSubmit(
    async ({ email }: ForgotPasswordInput) => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(email)
    }
  )

  return (
    <AccountContainer message={t('mTrainYourBodyAndMind')}>
      <Heading color="gray.100" fontSize="xl">
        {t('mRecoverYourAccount')}
      </Heading>

      <View w="100%" maxW={500}>
        <Input
          {...register('email')}
          autoCorrect={false}
          autoCapitalize="none"
          label={t('wEmail')}
          placeholder={t('mTypeYourEmail')}
          icon="account-outline"
          keyboardType="email-address"
        />

        <Button
          {...btnControl}
          onPress={handleAuthentication}
          mt="4"
          title={t('wEnter')}
        />
      </View>

      <View w="100%" maxW={500}>
        <Center>
          <Text color="gray.50" mb="3">
            {t('mIHaveRegistration')}
          </Text>
          <Button title={t('mSignIn')} variant="outline" onPress={() => navTo('/')} />
        </Center>
      </View>
    </AccountContainer>
  )
}
