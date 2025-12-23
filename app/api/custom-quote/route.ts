import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, bedrooms, storeys, notes } = body;

    // Validate required fields
    if (!name || !email || !phone || !address || !bedrooms || !storeys) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Insert custom quote request
    const { data, error } = await supabase
      .from("custom_quote_requests")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        bedrooms: bedrooms.trim(),
        storeys: storeys.trim(),
        notes: notes?.trim() || null,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting custom quote request:", error);
      return NextResponse.json(
        { error: "Failed to submit quote request" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error: any) {
    console.error("Error in custom quote API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

