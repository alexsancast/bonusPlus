import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

//Api para obtener los empleados
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    const { data, error } = await supabase
        .from('empleados')
        .select('*')
        .eq('stat_bonus', true);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
        return NextResponse.json({ message: "No se encontraron empleados" }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function POST(request, { params }) {
    const { id } = params;
    const { data, error } = await supabase
        .from('empleados')
        .update({ stat_bonus: true })
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Bono de Navidad actualizado a true" }, { status: 200 });
}