import { Center, Heading, Text, View, useToast } from 'native-base'
import { useSetRecoilState } from 'recoil'

import { accountApi } from 'src/api'
import { authentication } from 'src/atoms'
import { ZodType, useForm, useLocales } from 'src/hooks'
import { Link, useNavigate } from 'src/router'
import { SignInInput } from 'src/types/account'
import { Button, Input } from 'src/views/components'

import { AccountContainer } from '../container'

export function SignInTemplate(): JSX.Element {
  const { t } = useLocales()
  const setAuthentication = useSetRecoilState(authentication)
  const navTo = useNavigate()
  const toast = useToast()

  const { btnControl, handleSubmit, register } = useForm<SignInInput>({
    defaultValues: { email: '', password: '' },
    zodSchema: (z: ZodType) =>
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
  })

  const submit = handleSubmit(async ({ email, password }: SignInInput) => {
    try {
      const { tokens, user } = await accountApi.login({ email, password })
      setAuthentication({ tokens, user })
    } catch (err) {
      toast.show({
        description: 'Usuário e/ou senha não conferem',
        duration: 5000,
        title: 'Autenticação',
      })
    }
  })

  return (
    <AccountContainer message={t('mTrainYourBodyAndMind')}>
      <Heading color="gray.100" fontSize="xl">
        {t('mAccessYourAccount')}
      </Heading>

      <View w="100%" maxW={500} gap="3">
        <Input
          {...register('email')}
          autoCorrect={false}
          autoCapitalize="none"
          label={t('wEmail')}
          placeholder={t('mTypeYourEmail')}
          icon="account-outline"
          keyboardType="email-address"
        />

        <Input
          {...register('password')}
          autoCorrect={false}
          autoCapitalize="none"
          label={t('wPassword')}
          placeholder={t('mTypeYourPassword')}
          icon="lock"
          secureEntry
        />

        <View alignSelf="flex-end">
          <Link to={'/forgot-password'}>
            <Text color="white">{t('mForgetPassword')}</Text>
          </Link>
        </View>

        <Button {...btnControl} onPress={submit} mt="4" title={t('wEnter')} />
      </View>

      <View w="100%" maxW={500} gap="3">
        <Center>
          <Text color="gray.50" mb="3">
            {t('mIDoNotHaveRegistration')}
          </Text>
          <Button
            title={t('mSignUp')}
            variant="outline"
            onPress={() => navTo('/sign-up')}
          />
        </Center>
      </View>
    </AccountContainer>
  )
}
