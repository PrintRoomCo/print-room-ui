"use client";

import * as React from "react";
import { motion } from "framer-motion";

export interface PriceSummaryData {
  totalAmount: number;
  shippingCost: number;
  carbonEstimateKg: number;
}

export interface PriceSummaryProps {
  data: PriceSummaryData;
  className?: string;
}

export function PriceSummary({ data, className }: PriceSummaryProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className ?? "bg-white rounded-xl shadow-sm p-8"}
    >
      <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total Quote Amount</span>
          <span>${data.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Cost (est.)</span>
          <span>${data.shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Carbon Emission Estimate</span>
          <span>{data.carbonEstimateKg.toFixed(2)} kg</span>
        </div>
      </div>
    </motion.section>
  );
} 