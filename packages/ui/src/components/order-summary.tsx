"use client";

import * as React from "react";
import { motion } from "framer-motion";

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3ENo image%3C/text%3E%3C/svg%3E";

interface DesignSummary {
  id: string;
  name: string;
  totalUnits: number;
  pricePerUnit: number;
  subtotal: number;
  leadTime: string;
  image?: string;
}

export interface OrderSummaryProps {
  designs: DesignSummary[];
  className?: string;
}

export function OrderSummary({ designs, className }: OrderSummaryProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className ?? "bg-white rounded-xl shadow-sm p-8"}
    >
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Design</th>
              <th className="p-2">Total Units</th>
              <th className="p-2">Price/Unit</th>
              <th className="p-2">Subtotal</th>
              <th className="p-2">Lead Time</th>
            </tr>
          </thead>
          <tbody>
            {designs.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {d.image && (
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-12 h-12 object-cover rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.startsWith('data:')) {
                            target.src = PLACEHOLDER_IMG;
                          }
                        }}
                      />
                    )}
                    <span>{d.name}</span>
                  </div>
                </td>
                <td className="p-2">{d.totalUnits}</td>
                <td className="p-2">${d.pricePerUnit.toFixed(2)}</td>
                <td className="p-2">${d.subtotal.toFixed(2)}</td>
                <td className="p-2">{d.leadTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
} 