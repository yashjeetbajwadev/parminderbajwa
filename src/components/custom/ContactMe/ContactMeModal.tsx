'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ContactForm } from './ContactmeForm'
type ContactMeFormProps = {
  className?: string
}
export function ContactModal({ className }: ContactMeFormProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>Get In Touch</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
        </DialogHeader>
        <ContactForm setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}

