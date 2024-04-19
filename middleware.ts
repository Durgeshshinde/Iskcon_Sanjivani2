import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.url;
  if (!req.cookies.has("AUTHRES")) {
    return NextResponse.redirect("http://localhost:3000/auth/signin");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/information/programs",
    "/admin/information/mcourses",
    "/admin/information/activities",
    "/admin/information/mactivities",
    "/admin/information/levels",
    "/admin/information/volunteers",
    "/admin/information/participants",
    "/admin/information/sadhana",
    "/admin/information/extracourses",
    "/admin/customizations",
    "/admin/dashboard",
  ],
};
