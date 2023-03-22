import { Center, Heading, Text, View, useToast } from 'native-base'

import { accountApi } from 'src/api'
import { ZodType, useForm, useLocales } from 'src/hooks'
import { useNavigate } from 'src/router'
import { SignUpInput } from 'src/types/account'
import { Button, Input } from 'src/views/components'

import { AccountContainer } from '../container'

export function SignUpTemplate(): JSX.Element {
  const { t } = useLocales()
  const navTo = useNavigate()
  const toast = useToast()

  const { btnControl, handleSubmit, register } = useForm<SignUpInput>({
    defaultValues: { email: '', name: '', password: '', password_confirmation: '' },
    zodSchema: (z: ZodType) =>
      z
        .object({
          email: z.string().email(),
          name: z.string().min(4),
          password: z.string().min(6),
          password_confirmation: z.string().min(6),
        })
        .superRefine(({ password, password_confirmation }, ctx) => {
          if (password !== password_confirmation) {
            ctx.addIssue({
              code: 'custom',
              params: [{ type: 'invalid_password_confirmation_match' }],
              path: ['password_confirmation'],
            })
          }
        }),
  })

  const submit = handleSubmit(async ({ email, name, password }: SignUpInput) => {
    accountApi
      .register({ email, name, password })
      .then(() => navTo('sign-in'))
      .catch(err => {
        let errorMsgs = ''
        err.data.message.forEach((e: any) => (errorMsgs += `${e}\n`))

        toast.show({
          bg: 'gray.600',
          description: `${errorMsgs}`,
          duration: 5000,
          maxW: 500,
          placement: 'top',
          title: 'Register',
        })
      })
  })

  return (
    <AccountContainer message={t('mTrainYourBodyAndMind')}>
      <Heading color="gray.100" fontSize="xl">
        {t('mCreateYourAccount')}
      </Heading>

      <View w="100%" maxW={500} gap="3">
        <Input
          {...register('name')}
          label={t('wName')}
          placeholder={t('mTypeYourName')}
          icon="account-outline"
        />

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

        <Input
          {...register('password_confirmation')}
          autoCorrect={false}
          autoCapitalize="none"
          label={t('wPasswordConfirmation')}
          placeholder={t('mTypeYourPasswordConfirmation')}
          icon="lock"
          secureEntry
        />

        <Button {...btnControl} onPress={submit} mt="4" title={t('wRegister')} />
      </View>

      <View w="100%" maxW={500} gap="3">
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
