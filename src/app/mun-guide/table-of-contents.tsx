import { Button } from '@/components/ui/button'
import { Award, BookOpen, Users, MessageCircle, Target, Lightbulb, FileText, PenTool } from 'lucide-react'

const sections = [
  { id: 'introduction', title: 'Introduction to MUN', icon: Users },
  { id: 'preparation', title: 'Pre-Conference Preparation', icon: BookOpen },
  { id: 'research', title: 'Research Techniques', icon: Target },
  { id: 'position-paper', title: 'Writing Position Papers', icon: FileText },
  { id: 'speaking', title: 'Public Speaking Skills', icon: MessageCircle },
  { id: 'negotiation', title: 'Negotiation Strategies', icon: Lightbulb },
  { id: 'rules', title: 'Rules of Procedure', icon: PenTool },
  { id: 'awards', title: 'Winning Awards', icon: Award },
]

type SectionId = typeof sections[number]['id']

interface TableOfContentsProps {
  activeSection: SectionId
  setActiveSection: (sectionId: SectionId) => void
}

export function TableOfContents({ activeSection, setActiveSection }: TableOfContentsProps) {
  return (
    <nav className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
      {sections.map((section) => (
        <Button
          key={section.id}
          variant="ghost"
          className={`w-full justify-start ${
            activeSection === section.id ? 'bg-blue-100 text-blue-700' : ''
          }`}
          onClick={() => setActiveSection(section.id)}
        >
          <section.icon className="mr-2 h-4 w-4" />
          {section.title}
        </Button>
      ))}
    </nav>
  )
}

