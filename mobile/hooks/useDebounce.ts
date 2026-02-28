import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'



const useDebounce = <T,>(value: T, delay: number): T => {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(()=> {
        const handler = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handler)
    }, [value, delay])
  return debounceValue
}

export default useDebounce