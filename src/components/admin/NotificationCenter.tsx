import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function NotificationCenter({ userRole }: { userRole: string }) {
  const [notificationType, setNotificationType] = useState('')
  const [notificationContent, setNotificationContent] = useState('')

  const handleSendNotification = () => {
    // Implement send notification functionality
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notification Center</h2>
      <div className="mb-4">
        <Select onValueChange={setNotificationType}>
          <SelectTrigger>
            <SelectValue placeholder="Select notification type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="in-app">In-App Notification</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Textarea
          value={notificationContent}
          onChange={(e) => setNotificationContent(e.target.value)}
          placeholder="Enter notification content..."
          className="mb-2"
        />
      </div>
      <Button onClick={handleSendNotification}>Send Notification</Button>
    </div>
  )
}

