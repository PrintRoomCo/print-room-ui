"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Input } from "./input";
import { Textarea } from "./textarea";

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  shippingAddress: string;
  invoiceAddress: string;
  shippingCountry: string;
  freightOption: "sea" | "air";
}

export interface QuoteDetailsFormProps {
  data: QuoteFormData;
  onChange: (field: keyof QuoteFormData, value: string) => void;
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function QuoteDetailsForm({ data, onChange, className }: QuoteDetailsFormProps) {
  const handle = (field: keyof QuoteFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className={className ?? "bg-white rounded-xl shadow-sm p-8"}
    >
      <h2 className="text-2xl font-bold mb-6">Quote Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={item} className="space-y-4">
          <div className="mypr-form__group">
            <label className="mypr-form__label">First Name</label>
            <Input value={data.firstName} onChange={handle("firstName")} placeholder="John" />
          </div>
          <div className="mypr-form__group">
            <label className="mypr-form__label">Last Name</label>
            <Input value={data.lastName} onChange={handle("lastName")} placeholder="Doe" />
          </div>
          <div className="mypr-form__group">
            <label className="mypr-form__label">Email</label>
            <Input type="email" value={data.email} onChange={handle("email")} placeholder="john@example.com" />
          </div>
          <div className="mypr-form__group">
            <label className="mypr-form__label">Phone Number</label>
            <Input type="tel" value={data.phone} onChange={handle("phone")} placeholder="+1 555 123 4567" />
          </div>
          <div className="mypr-form__group">
            <label className="mypr-form__label">Business Name</label>
            <Input value={data.businessName} onChange={handle("businessName")} placeholder="ACME Inc." />
          </div>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <div className="mypr-form__group">
            <label className="mypr-form__label">Shipping Address</label>
            <Textarea rows={4} value={data.shippingAddress} onChange={handle("shippingAddress")} placeholder="123 Main St, City, Country" />
          </div>
          <div className="mypr-form__group">
            <label className="mypr-form__label">Invoice Address</label>
            <Textarea rows={4} value={data.invoiceAddress} onChange={handle("invoiceAddress")} placeholder="Same as shipping" />
          </div>
          <div className="mypr-form__group">
            <label className="mypr-form__label">Shipping Country</label>
            <select className="mypr-input" value={data.shippingCountry} onChange={handle("shippingCountry")}>
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div className="mypr-form__group">
            <label className="mypr-form__label">Freight Option</label>
            <select className="mypr-input" value={data.freightOption} onChange={handle("freightOption")}>
              <option value="sea">Sea Freight</option>
              <option value="air">Air Freight</option>
            </select>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 