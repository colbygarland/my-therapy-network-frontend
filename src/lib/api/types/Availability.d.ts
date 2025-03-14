import type { PractitionType } from './PractitionTypes'

type Practitioner = {
  id: number
  name: string
  email: string
  phone: string
  company_id: number | null
  user_id: number | null
  created_at: string
  updated_at: string
  practition_types: string[]
}

export type Availability = {
  id: number
  practitioner_id: number
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  practition_type_id: number
  practitioner: Practitioner
  practition_type: PractitionType
}
