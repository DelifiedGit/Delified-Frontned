import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  // TODO: Replace with actual database query
  const mun = {
    id,
    title: 'Global Climate Summit MUN',
    date: '2024-03-15',
    venue: 'New York City',
    registerBy: '2024-02-15',
    price: 500,
    image: '/placeholder.jpeg',
    type: 'International',
    description: 'Join us for a simulation of global climate negotiations.',
    committees: ['UNSC', 'UNHRC', 'WHO'],
    schedule: [
      {
        day: 'Day 1',
        events: [
          { time: '09:00 AM', event: 'Opening Ceremony' },
          { time: '10:30 AM', event: 'Committee Session 1' }
        ]
      },
      {
        day: 'Day 2',
        events: [
          { time: '09:00 AM', event: 'Committee Session 2' },
          { time: '02:00 PM', event: 'Committee Session 3' }
        ]
      }
    ],
    customFields: {
      'Committee Preference': ['UNSC', 'UNHRC', 'WHO'],
      'Dietary Requirements': ['Vegetarian', 'Vegan', 'No restrictions'],
      'T-Shirt Size': ['S', 'M', 'L', 'XL']
    }
  }

  if (!mun) {
    return NextResponse.json({ error: 'MUN not found' }, { status: 404 })
  }

  return NextResponse.json(mun)
}