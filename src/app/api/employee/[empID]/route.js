import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

//Api para obtener los empleados
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request, { params }) {
    // const { empID } = params;
    console.log(params);
    //const { data, error } = await supabase.from('empleados').select('*').eq('id', empID);
}