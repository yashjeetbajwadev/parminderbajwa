"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactmeForm";
import { cn } from "@/lib/utils";
import { Description } from "@radix-ui/react-dialog";
type ContactMeFormProps = Readonly<{
  className?: string;
}>;
export function ContactModal({ className }: ContactMeFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTitle hidden>Get In Touch</DialogTitle>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn("bg-blue-500 rounded-xl hover:bg-blue-600", className)}
        >
          Get In Touch
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white sm:mx-auto rounded-xl overflow-clip" >
        <Description hidden>
        Get In Touch Form
        </Description>
        <ContactForm setOpen={setOpen} className="px-0" />
      </DialogContent>
    </Dialog>
  );
}
