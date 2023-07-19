export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: number
  email: string
  password: string
  name?: string
  field?: string
  abbr?: string
  bio?: string
  image?: string
  visit_type?: "Virtual" | 'In-person'
  available_date?: string[]
  available_time?: string[]
  created_at: string
  updated_at: string
}

export interface DoctorField {
  id: number
  name: string
  abbr: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: number
  doctor_id: number
  user_id: number
  appointment_date: string
  appointment_time: string
  created_at: string
  updated_at: string
}


export interface FetchResultResp<T> {
  status: boolean,
  message: string
  data?: T | null
}