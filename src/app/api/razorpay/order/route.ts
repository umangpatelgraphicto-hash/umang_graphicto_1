import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { plan } = await req.json();

  const amount =
    plan === "annual" ? 7088 * 100 : 599 * 100;

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `template_${plan}`,
  });

  return NextResponse.json(order);
}
