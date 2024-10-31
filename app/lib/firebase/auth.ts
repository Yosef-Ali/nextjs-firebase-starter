import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    
    if (!sessionCookie) return null;
    
    // Verify the session cookie and get the user
    const decodedClaim = await getAuth().verifySessionCookie(sessionCookie, true);
    return decodedClaim;
  } catch (error) {
    return null;
  }
} 