"use client";

import ContactDetail from "@/app/about/(components)/ContactDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAlert } from "../Alert";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(7, { message: "Please enter a valid phone number." }),
  message: z
    .string()
    .min(2, { message: "Message must be at least 2 characters." }),
});

type FormData = z.infer<typeof formSchema>;
type ContactFormProps = {
  setOpen?: Function;
  className?: string;
};

export function ContactForm({
  setOpen,
  className,
}: Readonly<ContactFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { callAlert } = useAlert();

  const onSubmit = async (data: FormData) => {
    if (!recaptchaValue) {
      setSubmitError("Please complete the reCAPTCHA");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const resetForm = () => {
        reset();
        setRecaptchaValue(null);
      };

      const response = await fetch(
        "/api/post?custom=true&json=true&route=contactme",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, recaptchaValue }),
        }
      );

      resetForm();
      if (!response.ok) {
        callAlert("Error", "Failed to submit the form");
        throw new Error("Failed to submit the form");
      }
      callAlert(
        "Message Sent!",
        "Thank you for your message. We'll get back to you soon."
      );
      setOpen?.(false);
    } catch (error) {
      setSubmitError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }

    reset();
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center text-gray-700 px-5 xl:px-0",
        className
      )}
    >
      <h1 className="mb-4 text-2xl font-bold md:text-3xl">Get in Touch</h1>
      <p className="w-full max-w-lg mb-8 text-center text-gray-600">
        I can&apos;t wait to hear from you! Please fill out the form below and
        I&apos;ll get back to you as soon as possible.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-8 space-y-4 bg-white border-2 rounded-lg shadow-lg"
      >
        <ContactDetail className="justify-start pb-2" />
        <div>
          <Input
            placeholder="Your Name"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            type="phone"
            placeholder="Your Phone"
            {...register("phone")}
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Textarea
            placeholder="Your Message"
            {...register("message")}
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>
        <ReCAPTCHA
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
          onChange={(value) => setRecaptchaValue(value)}
        />

        {submitError && (
          <div
            className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
            role="alert"
          >
            <span className="block sm:inline">{submitError}</span>
          </div>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
