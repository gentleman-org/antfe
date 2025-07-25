// app/api/dcbot/meetingshares/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
