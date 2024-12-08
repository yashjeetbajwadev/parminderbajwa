"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactmeForm";
import { cn } from "@/lib/utils";
type ContactMeFormProps = {
  className?: string;
};
export function ContactModal({ className }: ContactMeFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn("bg-blue-500 rounded-xl hover:bg-blue-600", className)}
        >
          Get In Touch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <ContactForm setOpen={setOpen} className="p-0" />
      </DialogContent>
    </Dialog>
  );
}
