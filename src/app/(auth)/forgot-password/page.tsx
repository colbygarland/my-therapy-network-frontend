'use client'

import Button from '@/components/__DO_NOT_USE/Button'
import Input from '@/components/__DO_NOT_USE/Input'
import InputError from '@/components/__DO_NOT_USE/InputError'
import Label from '@/components/__DO_NOT_USE/Label'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Page = () => {
  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = event => {
    event.preventDefault()

    forgotPassword({ email, setErrors, setStatus })
  }

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {/* Session Status */}
      <AuthSessionStatus className="mb-4" status={status} />

      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            className="mt-1 block w-full"
            onChange={event => setEmail(event.target.value)}
            required
            autoFocus
          />

          {/* @ts-expect-error from the scaffolding */}
          <InputError messages={errors.email} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button>Email Password Reset Link</Button>
        </div>
      </form>
    </>
  )
}

export default Page
