import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, defaultRedirect, publicRoutes } from "./routes";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig)


export default auth((req)=> {
    const { nextUrl } = req;
    const isLogging = !!req.auth; // Vérifie si l'utilisateur est connecté

    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
    
    
    if (isApiAuthRoutes) {
      return NextResponse.next();
    }
  
    if (isAuthRoutes) {
      if (isLogging) {
        return NextResponse.redirect(new URL(defaultRedirect, nextUrl));
      }
      return NextResponse.next();
    }
  
    if (!isPublicRoutes && !isLogging) {
      // Si l'utilisateur n'est pas connecté et que la route est protégée, redirigez-le vers la page de connexion
      return NextResponse.redirect(new URL('/auth/login', nextUrl));
    }
  
    return NextResponse.next();
  })
  export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  };