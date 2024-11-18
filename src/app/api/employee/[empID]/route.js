import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';


//Api para obtener los empleados
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request, { params }) {
    const { empID } = params;
    const url = new URL(request.url);
    const searchField = url.searchParams.get('field') || 'nombre';
    const searchTerm = url.searchParams.get('term') || '';

    console.log(`Buscando por ${searchField}: ${searchTerm}`);

    const { data, error } = await supabase
        .from('empleados')
        .select('*')
        .ilike(searchField, `%${searchTerm}%`);

    if (error) {
        console.error("Error al obtener los datos:", error);
        return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
    }

    if (!data || data.length === 0) {
        console.log("No se encontraron registros.");
        return NextResponse.json({ message: "No se encontraron registros" }, { status: 404 });
    }

    return NextResponse.json(data);
}