import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { phone: string } }
) {
  try {
    const response = await fetch(
      `${SERVER_ENDPOINT}/participant/phone/${params.phone}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData },
        { status: response.status }
      );
    } else {
      const errorData = await response.json();
      if (response.status === 404) {
        return NextResponse.json(
          { message: errorData.message },
          { status: response.status }
        );
      }
      if (response.status === 409) {
        return NextResponse.json(
          { message: errorData.message },
          { status: response.status }
        );
      }

      console.log(errorData);
      return NextResponse.json(
        { message: errorData.message },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "something unexpected happened" },
      { status: 500 }
    );
  }
}
