import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebase/admin';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Session creation failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 