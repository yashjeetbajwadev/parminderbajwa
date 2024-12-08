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
  return (
    <React.Fragment>
      <ButtonBreadcrumb items={BreadcrumbItems} />
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto mt-2 text-gray-700">
        <div className="md:w-1/3">
          <Card className="w-full">
            <CardContent className="p-6">
              <Image
                src="/parminderbajwa.webp"
                alt="Parminder Bajwa"
                width={300}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-700">
                Parminder Bajwa
              </h2>
              <p className="text-gray-700">
                Real Estate Specialist | Barfoot & Thompson
              </p>
              <ContactDetail className="justify-start mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                With a proven track record of successful property transactions,
                I transform real estate challenges into opportunities. My
                commitment is to deliver exceptional results tailored to your
                unique needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Core Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <div>
                    <span className="font-semibold">Strategic Expertise:</span>{" "}
                    Comprehensive market knowledge and innovative approaches to
                    buying and selling
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <div>
                    <span className="font-semibold">
                      Client-First Philosophy:
                    </span>{" "}
                    Personalized guidance through every stage of your property
                    journey
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <div>
                    <span className="font-semibold">Extensive Network:</span>{" "}
                    Connected with key industry professionals to maximize your
                    property&apos;s potential
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <div>
                    <span className="font-semibold">
                      Transparent Communication:
                    </span>{" "}
                    Clear, honest, and timely updates that keep you informed and
                    empowered
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 text-gray-700">
                <Badge variant="secondary">First-time buyer support</Badge>
                <Badge variant="secondary">Property valuation</Badge>
                <Badge variant="secondary">
                  Auction and tender representation
                </Badge>
                <Badge variant="secondary">Negotiation management</Badge>
                <Badge variant="secondary">
                  Marketing strategy development
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Partner with Parminder?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Your property goals deserve a dedicated, knowledgeable, and
                results-driven professional. Let&apos;s turn your real estate
                dreams into reality.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}
