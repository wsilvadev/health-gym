import axios from 'axios'
import {
  Avatar,
  Center,
  HStack,
  Button as NBButton,
  ScrollView,
  Skeleton,
  Text,
  View,
} from 'native-base'
import { EnvelopeSimple, LockKey, User } from 'phosphor-react-native'
import { useState } from 'react'

import { ZodType, useForm, useLocales } from 'src/hooks'
import { EditProfileInput } from 'src/types/account'
import { nameInitials } from 'src/utils/text-formatters'
import { Button, Input } from 'src/views/components'

import {
  launchCamera,
  launchImageLibrary,
} from '../../../../lib/react-native-image-picker'

export function ProfileTemplate(): JSX.Element {
  const { t } = useLocales()
  const [loadingPhoto, setLoadingPhoto] = useState(false)
  const [userPhotoUri, setUserPhotoUri] = useState<string | undefined>(undefined)

  // const maxFileSize = 500000
  // const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const pwdSchema = (z: ZodType) => z.string().min(4).optional()

  const { register, handleSubmit, btnControl } = useForm<EditProfileInput>({
    defaultValues: {
      current_password: undefined,
      email: undefined,
      name: undefined,
      password: undefined,
      password_confirmation: undefined,
    },
    zodSchema: (z: ZodType) =>
      z
        .object({
          // avatar: z
          //   .any()
          //   .refine(files => files?.length === 0, 'Image is required.') // if no file files?.length === 0, if file files?.length === 1
          //   .refine(files => files?.[0]?.size >= maxFileSize, `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
          //   .refine(
          //     files => acceptedImageTypes.includes(files?.[0]?.type),
          //     '.jpg, .jpeg, .png and .webp files are accepted.'
          //   ),
          current_password: pwdSchema(z),
          email: z.string().email().optional(),
          name: z.string().min(4).optional(),
          password: pwdSchema(z),
          password_confirmation: pwdSchema(z),
        })
        .superRefine(
          ({ current_password, email, password, password_confirmation }, ctx) => {
            if ((password && !current_password) || (email && !current_password)) {
              ctx.addIssue({
                code: 'custom',
                params: [{ type: 'required_current_password' }],
                path: ['current_password'],
              })
            }

            if (password && password_confirmation !== password) {
              ctx.addIssue({
                code: 'custom',
                params: [{ type: 'invalid_password_confirmation_match' }],
                path: ['password_confirmation'],
              })
            }
          }
        ),
  })

  const submit = handleSubmit(async (input: EditProfileInput) => {
    // const options = {
    //   body: new FormData(),
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   method: 'POST',
    // }

    //console.log('input', JSON.stringify(input))

    const inputKeys: Array<keyof EditProfileInput> = [
      'email',
      'name',
      'current_password',
      'password',
      'password_confirmation',
    ]

    const data = new FormData()
    inputKeys.forEach(key => {
      data.append(key, String(input[key]))
    })

    data.append('image', {
      name: 'user-photo.png',
      type: 'image/png',
      uri: userPhotoUri,
    } as never)

    //await new Promise(resolve => setTimeout(resolve, 1500))
    //console.log('data', JSON.stringify(data))
    axios
      .post('http://localhost:3001', data)
      .then(res => res.data)
      .catch(err => console.log(err))
    // fetch('http://localhost:3001', {
    //   body: JSON.stringify(data),
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   method: 'POST',
    // })
    //   .then(res => res.json())
    //   .catch(err => console.log(err))
  })

  const name = 'Jardel Bordignon'
  const photoSize = 33

  const handleToGetImageFrom = async (from: 'camera' | 'library') => {
    setLoadingPhoto(true)

    try {
      const launcher = from === 'camera' ? launchCamera : launchImageLibrary

      const { assets } = await launcher({ mediaType: 'photo' })

      if (assets && !!assets[0].uri) {
        //console.log('assets[0]', assets[0].uri)
        setUserPhotoUri(assets[0].uri)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingPhoto(false)
    }
  }

  return (
    <View flex={1}>
      <ScrollView>
        <Center mt={6}>
          {loadingPhoto ? (
            <Skeleton rounded="full" size={photoSize} startColor="gray.400" />
          ) : (
            <Avatar source={{ uri: userPhotoUri }} size={photoSize}>
              {nameInitials(name)}
            </Avatar>
          )}

          <HStack>
            <NBButton variant="ghost" onPress={() => handleToGetImageFrom('library')}>
              <Text color="green.500" fontWeight="bold">
                Galeria
              </Text>
            </NBButton>

            <NBButton variant="ghost" onPress={() => handleToGetImageFrom('camera')}>
              <Text color="green.500" fontWeight="bold">
                Câmera
              </Text>
            </NBButton>
          </HStack>
        </Center>

        <View w="100%" maxW={500} gap="3" m="auto" p={8}>
          <Input
            {...register('name')}
            label={t('wName')}
            placeholder={t('mTypeYourName')}
            icon={User}
            bg="gray.600"
          />

          {/* <NBButton
            variant="ghost"
            onPress={() => setShowingCredentialFields(!showingCredentialFields)}>
            <Text color="green.500" fontWeight="bold">
              {showingCredentialFields ? 'Hide ' : 'Show '} credential fields
            </Text>
          </NBButton>

        */}
          <Input
            {...register('current_password')}
            autoCorrect={false}
            autoCapitalize="none"
            label={t('wCurrentPassword')}
            placeholder={t('mTypeTheCurrentPassword')}
            icon={LockKey}
            secureEntry
            bg="gray.600"
            isRequired
          />

          <Input
            {...register('email')}
            autoCorrect={false}
            autoCapitalize="none"
            label={t('wEmail')}
            placeholder={t('mTypeYourEmail')}
            icon={EnvelopeSimple}
            keyboardType="email-address"
            bg="gray.600"
          />

          <Input
            {...register('password')}
            autoCorrect={false}
            autoCapitalize="none"
            label={t('wNewPassword')}
            placeholder={t('mTypeYourNewPassword')}
            icon={LockKey}
            secureEntry
            bg="gray.600"
          />

          <Input
            {...register('password_confirmation')}
            autoCorrect={false}
            autoCapitalize="none"
            label={t('wPasswordConfirmation')}
            placeholder={t('mTypeYourPasswordConfirmation')}
            icon={LockKey}
            secureEntry
            bg="gray.600"
          />

          <Button {...btnControl} onPress={submit} mt="4" title={t('wSave')} />
        </View>
      </ScrollView>
    </View>
  )
}
