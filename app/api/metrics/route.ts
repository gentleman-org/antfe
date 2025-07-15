// app/api/metrics/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // in actual project, you can send data to analysis service or database here
    console.log('Web Vitals:', body);
    // if you use Vercel Analytics, you can integrate it here
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
