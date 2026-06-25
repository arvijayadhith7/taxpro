import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const taxReturns = await prisma.taxReturn.findMany({
      where: { userId: session.user.id },
      orderBy: { assessmentYear: 'desc' }
    });

    return NextResponse.json(taxReturns);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { assessmentYear, formType, totalIncome, taxPaid, refundDue } = body;

    if (!assessmentYear || !formType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate random 15-digit ack number
    const ackNumber = Math.floor(100000000000000 + Math.random() * 900000000000000).toString();

    const newReturn = await prisma.taxReturn.create({
      data: {
        userId: session.user.id,
        assessmentYear,
        formType,
        status: "FILED",
        ackNumber,
        filedDate: new Date(),
        totalIncome: totalIncome || 0,
        taxPaid: taxPaid || 0,
        refundDue: refundDue || 0,
      }
    });

    return NextResponse.json({ success: true, data: newReturn });
  } catch (error: any) {
    console.error("ITR Submission error:", error);
    
    // Clean up Prisma's verbose error message
    let cleanMessage = error instanceof Error ? error.message : String(error);
    if (cleanMessage.includes('invocation in')) {
      // Extract just the last part of the Prisma error which usually has the actual reason
      const parts = cleanMessage.split('\n');
      const lastLine = parts[parts.length - 1] || parts[parts.length - 2];
      cleanMessage = lastLine.trim();
    }

    return NextResponse.json({ 
      error: "Failed to submit return", 
      details: cleanMessage
    }, { status: 500 });
  }
}
