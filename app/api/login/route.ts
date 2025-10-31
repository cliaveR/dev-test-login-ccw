import { NextRequest, NextResponse } from "next/server";
const SPRINGBOOT_LOGIN_URL = "http://localhost:8080/api/login";

export async function GET(){
    return NextResponse.json({"email": "harold@gmail.com", "password":"123"})
}

export async function POST(request: NextRequest){
    try {
    const clientBody = await request.json();
    
    const springBootResponse = await fetch(SPRINGBOOT_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientBody),
      cache: 'no-store',
    });

    if (!springBootResponse.ok) {
      const errorData = await springBootResponse.json();
      
      return NextResponse.json(
        errorData, 
        { status: springBootResponse.status }
      );
    }

    const successData = await springBootResponse.json();

    return NextResponse.json(
      successData, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Proxy Login Error:", error);
    
    return NextResponse.json(
      { message: "Next.js internal server error during login proxy" }, 
      { status: 500 }
    );
  }
}