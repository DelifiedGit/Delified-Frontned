import { NextResponse } from 'next/server'

export async function GET() {
  // TODO: Implement actual database query for user's MUNs
  // This is a mock response
  const mockMUNs = {
    past: [
      { id: "1", title: "Past MUN 1", date: "2023-05-15", venue: "Online", image: "/placeholder.jpeg", status: "past", customFields: { 'Committee': 'UNSC', 'Position': 'Delegate' } },
      { id: "2", title: "Past MUN 2", date: "2023-06-20", venue: "New York", image: "/placeholder.jpeg", status: "past", customFields: { 'Committee': 'UNHRC', 'Position': 'Chair' } },
    ],
    registered: [
      { id: "3", title: "Upcoming MUN 1", date: "2024-03-10", venue: "London", image: "/placeholder.jpeg", status: "upcoming", customFields: { 'Committee Preference': ['UNSC', 'WHO'], 'T-Shirt Size': 'M' } },
      { id: "4", title: "Ongoing MUN", date: "2024-02-28", venue: "Paris", image: "/placeholder.jpeg", status: "ongoing", customFields: { 'Committee': 'ECOSOC', 'Position': 'Delegate' } },
    ],
    upcoming: [
      { id: "5", title: "Future MUN 1", date: "2024-04-05", venue: "Tokyo", image: "/placeholder.jpeg", status: "upcoming", customFields: { 'Committee Preference': ['UNSC', 'UNHRC', 'WHO'], 'Dietary Requirements': 'Vegetarian' } },
      { id: "6", title: "Future MUN 2", date: "2024-05-12", venue: "Berlin", image: "/placeholder.jpeg", status: "upcoming", customFields: { 'Track Preference': ['AI Ethics', 'Cybersecurity'], 'Experience Level': 'Intermediate' } },
    ],
  }

  return NextResponse.json(mockMUNs)
}