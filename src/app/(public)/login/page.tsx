"use client";

import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { Building2, Shield, Eye, EyeOff, AlertTriangle, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPortal, setSelectedPortal] = useState(searchParams.get("portal") || "incometax");
  const [pan, setPan] = useState("");
  const [password, setPassword] = useState("");
  const [secureMessageChecked, setSecureMessageChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");

  const handleRefreshCaptcha = () => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  // Generate a random captcha automatically on initial load
  useEffect(() => {
    handleRefreshCaptcha();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!pan || !password) {
      setError("Please enter your User ID and Password.");
      return;
    }
    if (!secureMessageChecked) {
      setError("Please confirm your secure access message before proceeding.");
      return;
    }
    if (captchaInput.toUpperCase() !== captchaCode) {
      setError("Incorrect captcha code.");
      setCaptchaInput("");
      handleRefreshCaptcha();
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      pan,
      password,
    });

    if (result?.error) {
      setError("Invalid PAN or password.");
      setCaptchaInput("");
      handleRefreshCaptcha();
    } else {
      const session = await getSession();
      if (session?.user?.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push(`/${selectedPortal}/dashboard`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <div className="h-1 bg-gov-orange w-full"></div>
      <header className="bg-gov-blue text-white py-3 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-gov-orange" />
            <div>
              <h1 className="text-xl font-bold tracking-wide text-white">National Tax Portal</h1>
              <p className="text-xs text-blue-200">Department of Revenue, Ministry of Finance</p>
            </div>
          </Link>
        </div>
        <Link href="/" className="text-sm font-medium hover:underline text-white/90">
          Back to Home
        </Link>
      </header>

      {/* Main Login Body */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-border shadow-lg rounded-lg overflow-hidden">
          {/* Top orange identity bar */}
          <div className="bg-gov-blue text-white py-4 px-6 text-center">
            <h2 className="text-lg font-bold">Login to E-Filing Portal</h2>
            <p className="text-xs text-blue-200 mt-1">Secure online tax administration platform</p>
          </div>

          <div className="p-6">
            <Tabs defaultValue="taxpayer" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-slate-100 p-1 rounded-md">
                <TabsTrigger value="taxpayer" className="text-sm font-semibold">Taxpayer / Individual</TabsTrigger>
                <TabsTrigger value="deductor" className="text-sm font-semibold">Deductor (TAN)</TabsTrigger>
              </TabsList>

              <TabsContent value="taxpayer">
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border-l-4 border-gov-red p-3 rounded text-sm text-gov-red flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="portal-select">Target Simulator Portal *</Label>
                    <select
                      id="portal-select"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm font-semibold text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-blue"
                      value={selectedPortal}
                      onChange={(e) => setSelectedPortal(e.target.value)}
                    >
                      <option value="incometax">Income Tax E-Filing Portal</option>
                      <option value="gst">GST Common Portal</option>
                      <option value="tds">TDS CPC (TRACES)</option>
                      <option value="aadhaar">Aadhaar (UIDAI) Portal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pan">Enter User ID (PAN / Aadhaar Number) *</Label>
                    <Input
                      id="pan"
                      placeholder="e.g. ABCDE1234F"
                      className="uppercase font-semibold tracking-wide"
                      value={pan}
                      onChange={(e) => setPan(e.target.value.toUpperCase())}
                    />
                  </div>

                  {pan && (
                    <div className="border border-amber-200 bg-amber-50 p-3 rounded-md space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="secureCheck"
                          checked={secureMessageChecked}
                          onChange={(e) => setSecureMessageChecked(e.target.checked)}
                          className="h-4 w-4 text-gov-blue focus:ring-gov-blue border-gray-300 rounded"
                        />
                        <Label htmlFor="secureCheck" className="text-xs text-amber-900 font-semibold cursor-pointer">
                          Confirm Secure Access Message
                        </Label>
                      </div>
                      <p className="text-[11px] text-amber-800/80 leading-relaxed pl-6">
                        My secure access message is: <strong className="text-gov-blue">TAX-ADMIN-SECURE-ACCESS</strong>. Do not enter your password if this message does not match.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Enter Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-text"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Captcha */}
                  <div className="space-y-2 border-t border-border pt-4 mt-2">
                    <Label htmlFor="captcha">Enter Captcha Code *</Label>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-200 border border-slate-300 rounded px-4 py-2 font-mono font-bold text-lg tracking-wider text-slate-700 select-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200 to-slate-300 line-through decoration-slate-500 decoration-2">
                        {captchaCode}
                      </div>
                      <button
                        type="button"
                        onClick={handleRefreshCaptcha}
                        className="text-xs text-gov-blue hover:underline font-semibold"
                      >
                        Refresh Code
                      </button>
                      <Input
                        id="captcha"
                        placeholder="Code"
                        className="w-28 uppercase font-bold text-center"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gov-blue text-white py-2.5 rounded font-bold text-sm hover:bg-gov-blue-light transition flex items-center justify-center gap-2 mt-4"
                  >
                    <Key className="h-4 w-4" /> Login
                  </button>
                </form>
              </TabsContent>

              <TabsContent value="deductor">
                <div className="text-center py-8 text-text-muted">
                  <Shield className="h-10 w-10 mx-auto text-gov-blue mb-3 opacity-60" />
                  <p className="text-sm font-semibold">Tax Deductor Portal Login</p>
                  <p className="text-xs mt-1">Please enter your TAN registration details to proceed.</p>
                  {/* Keep simpler just to show content */}
                  <form onSubmit={handleLogin} className="space-y-4 text-left mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="tan">TAN (Tax Deduction Account Number) *</Label>
                      <Input placeholder="e.g. DELA12345B" className="uppercase" />
                    </div>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/${selectedPortal}/dashboard`);
                      }}
                      className="w-full bg-gov-blue text-white py-2.5 rounded font-bold text-sm hover:bg-gov-blue-light transition"
                    >
                      Verify & Proceed
                    </button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>

            <div className="border-t border-border mt-6 pt-4 text-center space-y-2 text-xs">
              <a href="#" className="text-gov-blue hover:underline block">Forgot Password?</a>
              <p className="text-text-muted">New to e-Filing? <a href="#" className="text-gov-blue hover:underline font-semibold">Register Now</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gov-blue text-white text-center py-4 text-xs border-t-2 border-gov-orange">
        <p>© 2026 National Tax Portal. Designed and developed by National Informatics Centre (NIC).</p>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans">Loading portal...</div>}>
      <LoginContent />
    </Suspense>
  );
}
