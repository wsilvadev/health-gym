import { useEffect, useState } from 'react'
import { PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

export const useCurrentPosition = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const verifyLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      setHasLocationPermission(granted === PermissionsAndroid.RESULTS.GRANTED)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    verifyLocationPermission()

    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setPosition({ latitude, longitude })
        },
        error => {
          console.error(error)
        }
      )
    }
  }, [hasLocationPermission])

  return position
}
