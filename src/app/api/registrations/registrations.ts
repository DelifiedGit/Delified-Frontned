import { NextApiRequest, NextApiResponse } from 'next'
import { createRegistration } from '@/lib/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const registration = await createRegistration(req.body)
      res.status(201).json(registration)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create registration' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

