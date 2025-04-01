'use client'

import Button from '@/components/__DO_NOT_USE/Button'
import Input from '@/components/__DO_NOT_USE/Input'
import InputError from '@/components/__DO_NOT_USE/InputError'
import Label from '@/components/__DO_NOT_USE/Label'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const PasswordReset = () => {
  const searchParams = useSearchParams()

  const { resetPassword } = useAuth({ middleware: 'guest' })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = event => {
    event.preventDefault()

    resetPassword({
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    })
  }

  useEffect(() => {
    // @ts-expect-error from the scaffolding
    setEmail(searchParams.get('email'))
  }, [searchParams.get('email')])

  return (
    <>
      {/* Session Status */}
      <AuthSessionStatus className="mb-4" status={status} />

      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="mt-1 block w-full"
            onChange={event => setEmail(event.target.value)}
            required
            autoFocus
          />

          {/* @ts-expect-error from the scaffolding */}
          <InputError messages={errors.email} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            className="mt-1 block w-full"
            onChange={event => setPassword(event.target.value)}
            required
          />

          {/* @ts-expect-error from the scaffolding */}
          <InputError messages={errors.password} className="mt-2" />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>

          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            className="mt-1 block w-full"
            onChange={event => setPasswordConfirmation(event.target.value)}
            required
          />

          <InputError
            // @ts-expect-error from the scaffolding
            messages={errors.password_confirmation}
            className="mt-2"
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button>Reset Password</Button>
        </div>
      </form>
    </>
  )
}

export default PasswordReset
