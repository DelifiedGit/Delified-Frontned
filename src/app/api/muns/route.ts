import { NextResponse } from 'next/server'

export async function GET() {
  // TODO: Replace with actual database query
  const muns = [
    {
      id: '1',
      title: 'Global Climate Summit MUN',
      date: '2024-03-15',
      venue: 'New York City',
      price: 500,
      image: '/placeholder.jpeg',
      type: 'International',
      customFields: {
        'Committee Preference': ['UNSC', 'UNHRC', 'WHO'],
        'Dietary Requirements': ['Vegetarian', 'Vegan', 'No restrictions'],
        'T-Shirt Size': ['S', 'M', 'L', 'XL']
      }
    },
    {
      id: '2',
      title: 'Tech Policy MUN',
      date: '2024-04-20',
      venue: 'San Francisco',
      price: 450,
      image: '/placeholder.jpeg',
      type: 'National',
      customFields: {
        'Track Preference': ['AI Ethics', 'Cybersecurity', 'Digital Privacy'],
        'Experience Level': ['Beginner', 'Intermediate', 'Advanced']
      }
    }
  ]

  return NextResponse.json(muns)
}