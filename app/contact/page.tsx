"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { BUSINESS_CONFIG } from "@/lib/constants"
import { validateFormData, sanitizeInput } from "@/lib/validation"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    // Validate form data
    const { isValid, errors: validationErrors } = validateFormData(formData)
    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      // Simulate form submission - in production, send to API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
      setErrors({})

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      setSubmitError("Failed to send message. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navigation />

      <main className="mx-auto w-full max-w-6xl flex-1 overflow-x-hidden px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-16">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Get In Touch</h1>
          <p className="mx-auto max-w-2xl text-base text-foreground/70 sm:text-xl">
            Have questions about our fragrances? We'd love to hear from you. Reach out and let's connect.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-16 md:grid-cols-3 md:gap-8">
          {/* Contact Information */}
          {[
            {
              title: "Email",
              content: BUSINESS_CONFIG.CONTACT_EMAIL,
              description: "Send us your inquiries anytime",
            },
            {
              title: "WhatsApp",
              content: BUSINESS_CONFIG.WHATSAPP_DISPLAY,
              description: "Quick responses and personalized assistance",
              link: `https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}`,
            },
            {
              title: "Instagram",
              content: `@${BUSINESS_CONFIG.INSTAGRAM_HANDLE}`,
              description: "Follow us for updates and offers",
              link: BUSINESS_CONFIG.INSTAGRAM_URL,
            },
            {
              title: "TikTok",
              content: `@${BUSINESS_CONFIG.TIKTOK_HANDLE}`,
              description: "Watch our latest videos and trends",
              link: BUSINESS_CONFIG.TIKTOK_URL,
            },
            {
              title: "Location",
              content: BUSINESS_CONFIG.LOCATION_NAME,
              description: BUSINESS_CONFIG.LOCATION_ADDRESS,
            },
          ].map((contact) => (
            <Card key={contact.title} className="p-5 text-center sm:p-6">
              <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
              {contact.link ? (
                <a 
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2 block break-all font-medium text-primary hover:underline"
                >
                  {contact.content}
                </a>
              ) : (
                <p className="mb-2 break-words font-medium text-primary">{contact.content}</p>
              )}
              <p className="text-sm text-foreground/70">{contact.description}</p>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card className="mx-auto max-w-2xl p-5 sm:p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
              <p className="font-medium">✓ Thank you for reaching out!</p>
              <p className="text-sm">We'll get back to you within 24 hours.</p>
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
              <p className="font-medium">✗ {submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  disabled={loading}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={errors.name ? "min-h-11 border-destructive focus:ring-destructive" : "min-h-11"}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={errors.email ? "min-h-11 border-destructive focus:ring-destructive" : "min-h-11"}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone <span className="text-muted-foreground text-xs">(Optional)</span>
              </label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={BUSINESS_CONFIG.WHATSAPP_DISPLAY}
                disabled={loading}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={errors.phone ? "min-h-11 border-destructive focus:ring-destructive" : "min-h-11"}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-destructive">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows={5}
                required
                disabled={loading}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={errors.message ? "border-destructive focus:ring-destructive" : ""}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="min-h-11 w-full bg-primary hover:bg-primary/90" 
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
