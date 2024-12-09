"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import ContactDetail from "./(components)/ContactDetail";
import ButtonBreadcrumb from "@/components/custom/BreadCrumb";
import React from "react";

export default function AboutMe() {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
  ];

  const coreStrengths = [
    {
      title: "Strategic Expertise",
      description:
        "Comprehensive market knowledge and innovative approaches to buying and selling",
    },
    {
      title: "Client-First Philosophy",
      description:
        "Personalized guidance through every stage of your property journey",
    },
    {
      title: "Extensive Network",
      description:
        "Connected with key industry professionals to maximize your property's potential",
    },
    {
      title: "Transparent Communication",
      description:
        "Clear, honest, and timely updates that keep you informed and empowered",
    },
  ];

  const services = [
    { short: "Buyer Support", full: "First-time buyer support" },
    { short: "Valuation", full: "Property valuation" },
    { short: "Auction", full: "Auction and tender representation" },
    { short: "Negotiation", full: "Negotiation management" },
    { short: "Marketing", full: "Marketing strategy development" },
  ];

  return (
    <React.Fragment>
      <ButtonBreadcrumb items={BreadcrumbItems} />

      <div className="container px-5 py-8 mx-auto xl:px-0 max-w-7xl">
        <div className="flex flex-col gap-6 text-gray-700 md:flex-row">
          <div className="md:w-1/3">
            <Card className="w-full max-w-md mx-auto overflow-hidden transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-50 bg-gradient-to-b from-transparent to-black hover:opacity-70" />
                  <Image
                    src="/parminderbajwa.webp"
                    alt="Parminder Bajwa"
                    width={400}
                    height={500}
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="p-6 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Parminder Bajwa
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Real Estate Specialist | Barfoot & Thompson
                  </p>
                  <ContactDetail className="justify-start mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 md:w-2/3">
            <Card className="w-full max-w-3xl mx-auto overflow-hidden transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Professional Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  With a proven track record of successful property
                  transactions, I transform real estate challenges into
                  opportunities. My commitment is to deliver exceptional results
                  tailored to your unique needs.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full max-w-3xl mx-auto overflow-hidden transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Core Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {coreStrengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="flex-shrink-0 w-6 h-6 mt-1 mr-3 text-green-500" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {strength.title}
                        </h3>
                        <p className="mt-1 text-base text-gray-600 dark:text-gray-300">
                          {strength.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="w-full max-w-3xl mx-auto overflow-hidden transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Services
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {services.map((service, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-2 text-sm text-gray-800 transition-colors duration-200 bg-gray-200 md:text-base dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <span className="block md:hidden">{service.short}</span>
                      <span className="hidden md:block">{service.full}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="w-full max-w-3xl mx-auto overflow-hidden transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Why Partner with Parminder?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  Your property goals deserve a dedicated, knowledgeable, and
                  results-driven professional. Let&apos;s turn your real estate
                  dreams into reality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
