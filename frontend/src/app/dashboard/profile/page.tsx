"use client";

import React from "react";
import { User, Phone, Globe, Shield, Save } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">Farmer Profile & Preferences</h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage your contact credentials and language preference for agricultural advisories
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-gray-900">
            <User className="w-5 h-5 text-emerald-700" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>

        <form className="space-y-4 my-2 text-xs" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="Rakib Kowshar"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Phone Number / Email</label>
            <input
              type="text"
              defaultValue="+91 98765 43210"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Advisory Language Preference</label>
            <select
              defaultValue="en"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
            >
              <option value="en">English (Default)</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>

          <div className="pt-3">
            <Button size="sm" icon={<Save className="w-3.5 h-3.5" />}>
              Save Preferences
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
