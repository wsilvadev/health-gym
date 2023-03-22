import AsyncStorage from '@react-native-async-storage/async-storage'

const storageKey = 'storageKey'

class Storage {
  public async clear(k: string | string[]): Promise<void> {
    const value = typeof k === 'string' ? '' : k.map(() => '')
    this.set(k, value)
  }

  public async get<T = any>(k: string | string[]): Promise<T> {
    // one item
    if (typeof k === 'string') {
      const data = await AsyncStorage.getItem(`@${storageKey}.${k}`)
      return data ? JSON.parse(data) : null
    }
    // many items
    const data = await AsyncStorage.multiGet(k.map(key => `@${storageKey}.${key}`))
    return data.map(item => (item[1] ? JSON.parse(item[1]) : null)) as T
  }

  public async set<T = any>(k: string | string[], value: any): Promise<T> {
    // one item
    if (typeof k === 'string') {
      await AsyncStorage.setItem(`@${storageKey}.${k}`, JSON.stringify(value))
      return value
    }
    // many items
    await AsyncStorage.multiSet(
      k.map((key, i) => [`@${storageKey}.${key}`, JSON.stringify(value[i])])
    )
    return value
  }
}

export const storage = new Storage()