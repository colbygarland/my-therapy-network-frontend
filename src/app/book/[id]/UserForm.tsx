'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { API } from '@/lib/api/api'
import { Patient } from '@/lib/api/types/Patient'
import { useState } from 'react'

export const UserForm = () => {
  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const phone = formData.get('phone')

    // See if the patient exists already
    const response = await API.patient.find({ email, phone })
    if (response.status !== 404) {
      setExistingPatient(response.data!)
    } else {
      // Create a new patient
      const response = await API.patient.create({
        name: formData.get('name')?.toString(),
        email: email?.toString(),
        phone: phone?.toString(),
      })
      if (response.status !== 201) {
        // Handle the error
      }
    }

    // go to step 2
  }

  const [existingPatient, setExistingPatient] = useState<Patient | null>(null)

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid max-w-md gap-4">
        <Input
          type="text"
          name="name"
          aria-label="Name"
          placeholder="Name"
          required
        />
        <Input
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Email"
          required
        />
        <Input
          type="phone"
          name="phone"
          aria-label="Phone"
          placeholder="Phone"
          required
        />
        <Button type="submit">Next</Button>
        {existingPatient && (
          <Alert variant="default">
            <AlertTitle>Welcome back, {existingPatient.name}!</AlertTitle>
            <AlertDescription />
          </Alert>
        )}
      </div>
    </form>
  )
}
