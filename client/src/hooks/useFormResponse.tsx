import { useState } from 'react'

export function useFormResponse() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  return { success, setSuccess, error, setError }
}
