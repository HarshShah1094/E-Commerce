"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface OrderFormProps {
  onSubmit: (formData: any) => void
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, "").length !== 16)
      newErrors.cardNumber = "Valid 16-digit card number required"
    if (!formData.expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiryDate))
      newErrors.expiryDate = "Use MM/YY format"
    if (!formData.cvv.trim() || !/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "3-digit CVV required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
          <CardDescription>Where should we deliver your order?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Street Address
            </label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                City
              </label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">
                State
              </label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? "border-destructive" : ""}
              />
              {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                ZIP Code
              </label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={errors.zipCode ? "border-destructive" : ""}
              />
              {errors.zipCode && <p className="text-xs text-destructive mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>Secure payment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
              Card Number
            </label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              className={errors.cardNumber ? "border-destructive" : ""}
            />
            {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                className={errors.expiryDate ? "border-destructive" : ""}
              />
              {errors.expiryDate && <p className="text-xs text-destructive mt-1">{errors.expiryDate}</p>}
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                CVV
              </label>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                className={errors.cvv ? "border-destructive" : ""}
              />
              {errors.cvv && <p className="text-xs text-destructive mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full py-6 text-lg" size="lg">
        Place Order
      </Button>
    </form>
  )
}
