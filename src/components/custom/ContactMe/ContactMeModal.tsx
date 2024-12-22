"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ContactForm } from "./ContactmeForm";
import { cn } from "@/lib/utils";
type ContactMeFormProps = Readonly<{
  className?: string;
}>;
export function ContactModal({ className }: ContactMeFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button
          buttonevent="Contact Me"
          variant="default"
          className={cn("bg-blue-500 rounded-xl hover:bg-blue-600", className)}
        >
          Get In Touch
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white sm:mx-auto rounded-xl overflow-clip" >
        <VisuallyHidden>
          <DialogTitle >Get In Touch</DialogTitle>
          <DialogDescription >
            Get In Touch Form
          </DialogDescription>
        </VisuallyHidden>
        <ContactForm setOpen={setOpen} className="px-0" />
      </DialogContent>
    </Dialog>
  );
}
