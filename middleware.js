import { clerkMiddleware } from '@clerk/nextjs/server';

// Initialize Clerk middleware
export default clerkMiddleware();

// Configure matcher to apply middleware to all routes except Next.js internals and static files
export const config = {
  matcher: [
    // Match all routes except for:
    // - _next (Next.js internals)
    // - static files (ending with a file extension)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
