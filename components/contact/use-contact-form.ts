'use client'

import { useReducer, useState } from 'react'
import { validateMessage } from '@/lib/validations'
import { sendMessage } from '@/lib/contact-api'
import type { ContactPayload } from '@/types'

interface ResultState {
  show: boolean
  message: string
  short: string
  type: string
}

type ResultAction =
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }
  | { type: 'VALIDATION_ERROR'; data: ResultState }
  | { type: 'NONE' }

const initialResult: ResultState = {
  show: false,
  message: '',
  short: '',
  type: 'primary',
}

const initialPayload: ContactPayload = {
  name: '',
  email: '',
  subject: 'New message from AlexLab',
  content: '',
}

function resultReducer(state: ResultState, action: ResultAction): ResultState {
  switch (action.type) {
    case 'SUCCESS':
      return {
        show: true,
        message: 'Your message was send. I will contact you ASAP. Thanks!',
        short: 'Very good!',
        type: 'text-green-400',
      }

    case 'ERROR':
      return {
        show: true,
        message: 'There was a problem sending your message. Please, try again.',
        short: 'Oops: ',
        type: 'text-red-400',
      }

    case 'VALIDATION_ERROR':
      return action.data

    case 'NONE':
      return initialResult

    default:
      return state
  }
}

export function useContactForm() {
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState<ContactPayload>(initialPayload)
  const [result, dispatch] = useReducer(resultReducer, initialResult)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPayload({
      ...payload,
      [name]: value,
    })
  }

  const send = () => {
    setLoading(true)

    sendMessage(payload)
      .then(() => {
        setLoading(false)
        dispatch({ type: 'SUCCESS' })
        setPayload(initialPayload)
      })
      .catch(() => {
        setLoading(false)
        dispatch({ type: 'ERROR' })
      })
  }

  const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validation = validateMessage(payload)

    if (!validation.success) {
      dispatch({
        type: 'VALIDATION_ERROR',
        data: {
          show: true,
          message: validation.error.issues[0].message,
          short: 'Hey,',
          type: 'text-yellow-400',
        },
      })

      return
    }

    send()
  }

  return { loading, payload, result, handleChange, validateForm }
}
