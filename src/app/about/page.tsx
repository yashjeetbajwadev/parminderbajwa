'use client';
import BackButtonBreadcrumb from "@/components/custom/BackBreadCrumb"
import ContactForm from "@/components/custom/ContactMeForm";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Award } from "lucide-react"
import Image from "next/image"
import React from "react"

export default function Component() {
    const BreadCrumbItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
    ]
    return (
        <div className="mx-auto w-4/5 px-4 py-8">
        <div className="mb-8">
            <BackButtonBreadcrumb items={BreadCrumbItems} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Parminder Bajwa</h1>
            <h2 className="text-2xl font-semibold">Your Key to Real Estate Success</h2>
            <p className="text-muted-foreground">
                Are you ready to make your property dreams a reality? Look no further than Parminder Bajwa, your dedicated
                real estate expert.
            </p>
            <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>021 0249 6278</span>
            </div>
            <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>parminder@example.com</span>
            </div>
            <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Auckland, New Zealand</span>
            </div>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-lg md:h-[400px]">
            <Image
                alt="Parminder Bajwa"
                className="object-cover"
                height="400"
                src="/parminderbajwa.webp"
                style={{
                aspectRatio: "300/400",
                objectFit: "cover",
                }}
                width="300"
            />
            </div>
        </div>
        <div className="mt-12 space-y-8">
            <section>
            <h3 className="text-2xl font-semibold mb-4">Why Choose Parminder?</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                "Client-Centric Approach",
                "Unparalleled Expertise",
                "Powerful Network",
                "Innovative Marketing",
                "Transparent Communication",
                "Unwavering Commitment",
                "Integrity and Respect",
                ].map((item, index) => (
                <Card key={index}>
                    <CardContent className="flex items-center p-4">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    <p>{item}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
            </section>
            <section>
            <h3 className="text-2xl font-semibold mb-4">Your Real Estate Journey Starts Here</h3>
            <p className="text-muted-foreground mb-4">
                Whether you&apos;re a first-time buyer, looking to upgrade, or planning a move to a new suburb, I&apos;m here to guide
                you every step of the way. From auctions to negotiations, from pricing strategies to tender processes – I&apos;ve
                got you covered.
            </p>
            <p className="font-semibold mb-4">Don&apos;t let your property goals remain dreams. Take the first step towards your real estate success today.</p>
            <Button className="w-full sm:w-auto">
                <Phone className="mr-2 h-4 w-4" /> Contact Parminder Now
            </Button>
            </section>
        </div>
        <div className="mt-12">
            <ContactForm />
        </div>
    </div>
  )
}