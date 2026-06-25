"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Key, User, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Student {
  id: string;
  pan: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [pan, setPan] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Fetch students function
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/students");
      if (!res.ok) throw new Error("Unauthorized or server error");
      const result = await res.json();
      setStudents(result.data || []);
    } catch (err) {
      console.error("Failed fetching students list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pan || !name || !password) {
      alert("Please fill in PAN, Name, and Password.");
      return;
    }

    try {
      setFormSubmitting(true);
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pan, name, password, email }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Failed to create student account.");
        return;
      }

      alert("Student account successfully created!");
      // Reset form fields
      setPan("");
      setName("");
      setPassword("");
      setEmail("");
      fetchStudents();
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the student account for ${name}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/students?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const result = await res.json();
        alert(result.error || "Failed to delete student account.");
        return;
      }

      alert("Student account deleted.");
      fetchStudents();
    } catch (err) {
      alert("An error occurred during deletion.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-xs">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-gov-blue font-bold text-lg">Student Accounts Administrator Control</h2>
        <p className="text-gray-600">Register new students with simulated PAN cards and passwords to practice e-filing returns.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Create Student Form */}
        <div className="bg-white border rounded-md shadow-sm p-5 space-y-4 h-fit">
          <h3 className="font-bold text-sm text-[#112a52] border-b pb-2 flex items-center gap-1.5">
            <Plus className="h-4 w-4" /> Create Student Account
          </h3>

          <form onSubmit={handleCreateStudent} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="std-pan">Student PAN *</Label>
              <Input
                id="std-pan"
                placeholder="e.g. ABCDE1234F"
                value={pan}
                onChange={e => setPan(e.target.value.toUpperCase())}
                maxLength={10}
                className="uppercase font-semibold tracking-wider h-8"
              />
              <span className="text-[10px] text-gray-500">Provide a mock 10-char PAN string.</span>
            </div>

            <div className="space-y-1">
              <Label htmlFor="std-name">Full Name *</Label>
              <Input
                id="std-name"
                placeholder="e.g. Rahul Kumar"
                value={name}
                onChange={e => setName(e.target.value)}
                className="h-8"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="std-email">Email (Optional)</Label>
              <Input
                id="std-email"
                placeholder="rahul@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="h-8"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="std-pass">Password *</Label>
              <div className="relative">
                <Input
                  id="std-pass"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password string"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="h-8 pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={formSubmitting}
              className="w-full bg-[#112a52] text-white py-2 rounded font-bold hover:bg-[#1f497d] disabled:opacity-50 transition"
            >
              {formSubmitting ? "Creating..." : "Register Student"}
            </button>
          </form>
        </div>

        {/* Right Side: Student Accounts List */}
        <div className="lg:col-span-2 bg-white border rounded-md shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-sm text-[#112a52] border-b pb-2 flex items-center gap-1.5">
            <User className="h-4 w-4" /> Registered Student Accounts
          </h3>

          {loading ? (
            <div className="text-center py-10 font-bold text-gray-500">Loading student accounts...</div>
          ) : students.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <ShieldAlert className="h-10 w-10 mx-auto opacity-50 mb-2" />
              <p>No student accounts created yet. Enter details on the left to add one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b font-bold text-gray-700">
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">PAN (User ID)</th>
                    <th className="p-2.5">Email</th>
                    <th className="p-2.5">Registered Date</th>
                    <th className="p-2.5 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-semibold text-gray-800">{std.name}</td>
                      <td className="p-2.5 font-mono font-bold text-gov-blue uppercase">{std.pan}</td>
                      <td className="p-2.5 text-gray-600">{std.email}</td>
                      <td className="p-2.5 text-gray-500">{new Date(std.createdAt).toLocaleDateString()}</td>
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => handleDeleteStudent(std.id, std.name)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 className="h-4 w-4 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
