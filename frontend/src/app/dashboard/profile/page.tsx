"use client";

import React, { useState } from "react";
import { User, Phone, Globe, Save, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Language } from "@/types";

export default function ProfilePage() {
  const { farmerMetadata, updateLanguage } = useAuth();
  const [selectedLang, setSelectedLang] = useState<Language>(
    farmerMetadata?.preferred_language || "en"
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateLanguage(selectedLang);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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

        {savedSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Preferences updated successfully!</span>
          </div>
        )}

        <form className="space-y-4 my-2 text-xs" onSubmit={handleSave}>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={farmerMetadata?.full_name || "Rakib Kowshar"}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              defaultValue={farmerMetadata?.phone || "+91 98765 43210"}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Advisory Language Preference</label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value as Language)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
              >
                <option value="en">English (Default)</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Weather risk advisories from your teammate&apos;s backend will be delivered in this language.
            </p>
          </div>

          <div className="pt-3">
            <Button type="submit" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
              Save Preferences
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
