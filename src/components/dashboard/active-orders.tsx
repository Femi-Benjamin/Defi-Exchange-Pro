"use client";

import { useState } from "react";

// Mock active limit orders
const mockOrders = [
  {
    id: 1,
    pair: "ETH/USDC",
    type: "Buy",
    price: "3,840.00",
    amount: "2.5 ETH",
    total: "$9,600.00",
    status: "Open",
  },
  {
    id: 2,
    pair: "BTC/USDC",
    type: "Sell",
    price: "98,000.00",
    amount: "0.5 BTC",
    total: "$49,000.00",
    status: "Open",
  },
  {
    id: 3,
    pair: "SOL/USDC",
    type: "Buy",
    price: "185.50",
    amount: "120 SOL",
    total: "$22,260.00",
    status: "Filled 45%",
  },
  {
    id: 4,
    pair: "ARB/ETH",
    type: "Sell",
    price: "0.00032",
    amount: "15,000 ARB",
    total: "4.8 ETH",
    status: "Open",
  },
];

export function ActiveOrders() {
  const [activeTab, setActiveTab] = useState("Open Orders");

  return (
    <div className="glass rounded-2xl overflow-hidden flex flex-col h-full min-h-[300px]">
      {/* Header & Tabs */}
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <div className="flex gap-4">
          {["Open Orders", "Order History", "Market Depth"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium transition-colors pb-3 -mb-3 relative ${
                activeTab === tab
                  ? "text-primary"
                  : "text-muted hover:text-white"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>
        <button className="text-xs text-muted hover:text-white transition-colors">
          Cancel All
        </button>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-muted uppercase bg-white/5">
            <tr>
              <th className="px-5 py-3 font-medium">Pair</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium text-right">Price</th>
              <th className="px-5 py-3 font-medium text-right">Amount</th>
              <th className="px-5 py-3 font-medium text-right">Total</th>
              <th className="px-5 py-3 font-medium text-right">Status</th>
              <th className="px-5 py-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {mockOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-white/2 transition-colors group"
              >
                <td className="px-5 py-3.5 font-semibold text-white">
                  {order.pair}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${order.type === "Buy" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}
                  >
                    {order.type}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right font-medium text-white">
                  {order.price}
                </td>
                <td className="px-5 py-3.5 text-right text-muted">
                  {order.amount}
                </td>
                <td className="px-5 py-3.5 text-right text-white">
                  {order.total}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="text-muted">{order.status}</span>
                </td>
                <td className="px-5 py-3.5 text-center">
                  <button className="text-muted hover:text-danger hover:underline text-xs transition-colors opacity-0 group-hover:opacity-100">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Placeholder if empty */}
        {activeTab !== "Open Orders" && (
          <div className="flex flex-col items-center justify-center p-10 h-48 text-muted">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <span className="text-xl">📊</span>
            </div>
            <p className="text-sm">No data for {activeTab}</p>
          </div>
        )}
      </div>
    </div>
  );
}
