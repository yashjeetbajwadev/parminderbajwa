'use client'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAlert } from './Alert'

type FormData = {
  FName: string
  Email: string
  Phone: string
  Message: string
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { callAlert } = useAlert()
  const onSubmit = async (data: FormData) => {
    if (!recaptchaValue) {
      setSubmitError("Please complete the reCAPTCHA")
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const resetForm = () => {
        reset()
        setRecaptchaValue(null)
      }

      const response = await fetch('/api/post?custom=true&json=true&route=contactme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, recaptchaValue }),
      })

      resetForm();
      if (!response.ok) {
        callAlert('Error', 'Failed to submit the form');
        throw new Error('Failed to submit the form');
      }
      callAlert('Success', 'Form submitted successfully');
    } catch (error) {
      setSubmitError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <React.Fragment>
    <h3 className="text-2xl font-semibold mb-4 text-center">Contact Me</h3>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div>
        <Label htmlFor="FName">Full Name</Label>
        <Input
          id="FName"
          {...register("FName", { required: "Full name is required" })}
          aria-invalid={errors.FName ? "true" : "false"}
        />
        {errors.FName && <p className="text-red-500 text-sm mt-1">{errors.FName.message}</p>}
      </div>

      <div>
        <Label htmlFor="Email">Email</Label>
        <Input
          id="Email"
          type="email"
          {...register("Email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          aria-invalid={errors.Email ? "true" : "false"}
        />
        {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>}
      </div>

      <div>
        <Label htmlFor="Phone">Phone</Label>
        <Input
          id="Phone"
          type="tel"
          {...register("Phone", { 
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Invalid phone number, please enter 10 digits"
            }
          })}
          aria-invalid={errors.Phone ? "true" : "false"}
        />
        {errors.Phone && <p className="text-red-500 text-sm mt-1">{errors.Phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="Message">Message</Label>
        <Textarea
          id="Message"
          {...register("Message", { required: "Message is required" })}
          aria-invalid={errors.Message ? "true" : "false"}
        />
        {errors.Message && <p className="text-red-500 text-sm mt-1">{errors.Message.message}</p>}
      </div>

      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
        onChange={(value) => setRecaptchaValue(value)}
      />

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{submitError}</span>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
    </React.Fragment>
  )
}