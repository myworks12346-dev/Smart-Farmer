import Link from "next/link";
import { Sprout, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f9f6] flex flex-col justify-center items-center p-4 text-center">
      <div className="max-w-md w-full space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#15803d] flex items-center justify-center mx-auto shadow-sm">
          <Sprout className="w-8 h-8 text-[#16a34a]" />
        </div>

        <span className="text-4xl font-black text-[#0f4a2c]">404</span>

        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Field Plot Not Found
        </h2>

        <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
          The agricultural section or parcel page you are looking for does not exist or has been relocated.
        </p>

        <div className="pt-2 flex justify-center gap-3">
          <Link href="/dashboard">
            <Button size="md" icon={<Home className="w-4 h-4" />}>
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
