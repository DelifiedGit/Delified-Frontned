import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function Settings({ userRole }: { userRole: string }) {
  const [siteName, setSiteName] = useState('')
  const [theme, setTheme] = useState('')

  const handleSaveSettings = () => {
    // Implement save settings functionality
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">
            Site Name
          </label>
          <Input
            id="site-name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
            Theme
          </label>
          <Select onValueChange={setTheme}>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  )
}

