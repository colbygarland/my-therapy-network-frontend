'use client'

import Button from '@/components/__DO_NOT_USE/Button'
import Input from '@/components/__DO_NOT_USE/Input'
import InputError from '@/components/__DO_NOT_USE/InputError'
import Label from '@/components/__DO_NOT_USE/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Login = () => {
  const router = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    // @ts-expect-error from the scaffolding
    if (router.reset?.length > 0 && errors.length === 0) {
      // @ts-expect-error from the scaffolding
      setStatus(atob(router.reset))
    } else {
      setStatus(null)
    }
  })

  const submitForm = async event => {
    event.preventDefault()

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    })
  }

  return (
    <>
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
            autoComplete="current-password"
          />

          {/* @ts-expect-error from the scaffolding */}
          <InputError messages={errors.password} className="mt-2" />
        </div>

        {/* Remember Me */}
        <div className="mt-4 block">
          <label htmlFor="remember_me" className="inline-flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              name="remember"
              className="focus:ring-opacity-50 rounded-sm border-gray-300 text-indigo-600 shadow-xs focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200"
              onChange={event => setShouldRemember(event.target.checked)}
            />

            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-600 underline hover:text-gray-900">
            Forgot your password?
          </Link>

          <Button className="ml-3">Login</Button>
        </div>
      </form>
    </>
  )
}

export default Login
