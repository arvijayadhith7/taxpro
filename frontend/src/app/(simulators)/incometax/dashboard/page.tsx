import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { 
  IndianRupee, 
  TrendingDown, 
  Clock, 
  ShieldCheck, 
  FileText, 
  AlertCircle,
  ArrowRight,
  Download
} from "lucide-react";
import { StatCard } from "@/components/gov/StatCard";
import { StatusBadge } from "@/components/gov/StatusBadge";
import { ComplianceScore } from "@/components/gov/ComplianceScore";
import { NoticeCard } from "@/components/gov/NoticeCard";

const ICON_MAP: Record<string, React.ElementType> = {
  "tax-paid": IndianRupee,
  "refund": TrendingDown,
  "demand": Clock,
  "compliance": ShieldCheck,
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const taxReturns = await prisma.taxReturn.findMany({
    where: { userId: session.user.id },
    orderBy: { assessmentYear: 'desc' }
  });

  const notices = await prisma.notice.findMany({
    where: { userId: session.user.id },
    orderBy: { issueDate: 'desc' }
  });

  // Calculate KPIs
  const totalTaxPaid = taxReturns.reduce((sum, itr) => sum + (itr.taxPaid || 0), 0);
  const totalRefund = taxReturns.reduce((sum, itr) => sum + (itr.refundDue || 0), 0);
  
  const DASHBOARD_KPIS = [
    { id: "tax-paid", label: "Total Tax Paid", value: `₹${totalTaxPaid.toLocaleString()}`, trend: { value: "Up to date", isPositive: true }, subtitle: "AY 2023-24" },
    { id: "refund", label: "Refund Issued", value: `₹${totalRefund.toLocaleString()}`, trend: { value: "Credited", isPositive: true }, subtitle: "Bank ending in 4321" },
    { id: "demand", label: "Outstanding Demand", value: "₹0", trend: { value: "Clear", isPositive: true }, subtitle: "No pending dues" },
    { id: "compliance", label: "Compliance Status", value: "Compliant", trend: { value: "Good", isPositive: true }, subtitle: "All returns filed" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-xl font-bold text-gov-blue">Welcome, {session.user.name || "TAXPAYER"}</h1>
          <p className="text-sm font-semibold text-gray-600 mt-1">PAN: {session.user.pan} | Status: <span className="text-green-600">Active</span></p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-xs text-gray-500">Profile Completion: <span className="font-bold text-green-600">100%</span></p>
          <div className="w-full md:w-48 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-green-500 w-full"></div>
          </div>
          <Link href="/incometax/profile" className="text-xs text-blue-600 hover:underline mt-1 inline-block">Update Profile</Link>
        </div>
      </div>

      {/* Quick Links Grid (The core of the actual portal) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* e-File Card */}
        <div className="bg-white border-t-[3px] border-t-gov-blue border-x border-b border-gray-200 rounded-b-md p-5 shadow-sm text-center flex flex-col items-center justify-center hover:shadow-md transition">
          <FileText className="h-10 w-10 text-gov-blue mb-3" />
          <h3 className="font-bold text-gray-800">File Income Tax Return</h3>
          <p className="text-xs text-gray-500 mt-2 mb-4">File your ITR for AY 2026-27 or previous years.</p>
          <Link href="/incometax/itr" className="bg-gov-blue text-white px-6 py-2 rounded text-sm font-semibold hover:bg-blue-800 transition">
            File Now
          </Link>
        </div>

        {/* Form 26AS Card */}
        <div className="bg-white border-t-[3px] border-t-gov-blue border-x border-b border-gray-200 rounded-b-md p-5 shadow-sm text-center flex flex-col items-center justify-center hover:shadow-md transition">
          <ShieldCheck className="h-10 w-10 text-gov-blue mb-3" />
          <h3 className="font-bold text-gray-800">View Form 26AS</h3>
          <p className="text-xs text-gray-500 mt-2 mb-4">View your tax credit statement (TDS/TCS).</p>
          <Link href="/incometax/compliance/form-26as" className="border border-gov-blue text-gov-blue px-6 py-2 rounded text-sm font-semibold hover:bg-blue-50 transition">
            View 26AS
          </Link>
        </div>

        {/* e-Pay Tax Card */}
        <div className="bg-white border-t-[3px] border-t-gov-blue border-x border-b border-gray-200 rounded-b-md p-5 shadow-sm text-center flex flex-col items-center justify-center hover:shadow-md transition">
          <IndianRupee className="h-10 w-10 text-gov-blue mb-3" />
          <h3 className="font-bold text-gray-800">e-Pay Tax</h3>
          <p className="text-xs text-gray-500 mt-2 mb-4">Pay your Advance Tax, Self Assessment Tax.</p>
          <button className="border border-gov-blue text-gov-blue px-6 py-2 rounded text-sm font-semibold hover:bg-blue-50 transition">
            Pay Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Filed Returns */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <h2 className="font-bold text-gray-800">Recent Filed Returns</h2>
          </div>
          <div className="p-0">
            {taxReturns.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {taxReturns.slice(0, 3).map(itr => (
                  <div key={itr.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <p className="font-bold text-gov-blue text-sm">AY {itr.assessmentYear}</p>
                      <p className="text-xs text-gray-500 mt-1">Filed on: {new Date(itr.filedDate || '').toLocaleDateString()}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-1">Ack: {itr.ackNumber}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${itr.status === 'Processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {itr.status}
                      </span>
                      <button className="block mt-2 text-xs text-blue-600 hover:underline">Download Form</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">
                You have not filed any returns recently.
              </div>
            )}
          </div>
          <div className="bg-gray-50 border-t border-gray-200 p-3 text-center">
            <Link href="/incometax/itr" className="text-sm font-semibold text-gov-blue hover:underline">View All Returns</Link>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Pending Actions</h2>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{notices.filter(n => n.status !== "CLOSED").length}</span>
          </div>
          <div className="p-0">
            {notices.filter(n => n.status !== "CLOSED").length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notices.filter(n => n.status !== "CLOSED").slice(0, 3).map(notice => (
                  <div key={notice.id} className="p-4 flex gap-3 hover:bg-gray-50">
                    <div className="mt-1">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">{notice.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">Issued under section: {notice.noticeType}</p>
                      <p className="text-xs font-bold text-red-600 mt-2">Due Date: {new Date(notice.dueDate || '').toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm flex flex-col items-center">
                <ShieldCheck className="h-8 w-8 text-green-500 mb-2 opacity-50" />
                No pending actions for you.
              </div>
            )}
          </div>
          <div className="bg-gray-50 border-t border-gray-200 p-3 text-center">
            <Link href="/incometax/notices" className="text-sm font-semibold text-gov-blue hover:underline">Go to Worklist</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
