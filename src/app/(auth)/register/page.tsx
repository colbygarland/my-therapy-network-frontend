'use client'

import Button from '@/components/__DO_NOT_USE/Button'
import Input from '@/components/__DO_NOT_USE/Input'
import InputError from '@/components/__DO_NOT_USE/InputError'
import Label from '@/components/__DO_NOT_USE/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Page = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  const submitForm = event => {
    event.preventDefault()

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    })
  }

  return (
    <form onSubmit={submitForm}>
      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          type="text"
          value={name}
          className="mt-1 block w-full"
          onChange={event => setName(event.target.value)}
          required
          autoFocus
        />

        {/* @ts-expect-error from the scaffolding */}
        <InputError messages={errors.name} className="mt-2" />
      </div>

      {/* Email Address */}
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          value={email}
          className="mt-1 block w-full"
          onChange={event => setEmail(event.target.value)}
          required
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
          autoComplete="new-password"
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
        <Link
          href="/login"
          className="text-sm text-gray-600 underline hover:text-gray-900">
          Already registered?
        </Link>

        <Button className="ml-4">Register</Button>
      </div>
    </form>
  )
}

export default Page
