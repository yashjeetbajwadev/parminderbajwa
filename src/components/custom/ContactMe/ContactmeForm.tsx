'use client'

import ContactDetail from '@/app/about/(components)/ContactDetail'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAlert } from '../Alert'

const formSchema = z.object({
    FName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z.string().min(7,{ message: 'Please enter a valid Phone Number.' }),
    message: z.string().min(2, { message: 'Message must be at least 2 characters.' }),
})

type FormData = z.infer<typeof formSchema>
type ContactFormProps = {
    setOpen?: Function
}

export function ContactForm({ setOpen }: Readonly<ContactFormProps>) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });
    const { callAlert } = useAlert();

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
                callAlert('Error',
                    'Failed to submit the form',
                )
                throw new Error('Failed to submit the form');
            }
            callAlert('Message Sent!',
                'Thank you for your message. We\'ll get back to you soon.',
            )
            setOpen?.(false);
        } catch (error) {
            setSubmitError("Failed to submit the form. Please try again.");
        } finally {
            setIsSubmitting(false)
        }


        reset()
    }

    return (
        <React.Fragment>
            <ContactDetail className='justify-start pb-2' />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input
                        placeholder="Your Name"
                        {...register('FName')}
                        aria-invalid={errors.FName ? 'true' : 'false'}
                    />
                    {errors.FName && <p className="text-sm text-red-500 mt-1">{errors.FName.message}</p>}
                </div>
                <div>
                    <Input
                        type="email"
                        placeholder="Your Email"
                        {...register('email')}
                        aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <Input
                        type="phone"
                        placeholder="Your Phone"
                        {...register('phone')}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <Textarea
                        placeholder="Your Message"
                        {...register('message')}
                        aria-invalid={errors.message ? 'true' : 'false'}
                    />
                    {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
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
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
            </form>
        </React.Fragment>

    )
}

