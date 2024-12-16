import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


//Api para obtener los empleados
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
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

export async function POST(request) {
    try {
        const { id, sign } = await request.json();
        console.log("Numero de empleado: " + id);
        const { data, error } = await supabase
            .from('empleados')
            .update({ stat_bonus: true, sign: sign })
            .eq('id', id)
            .select();
        console.log("Resultado de la actualización:", { data, error });

        if (error) {
            console.error("Error en la actualización:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            message: "Bono de Navidad actualizado a true",
            data: data
        }, { status: 200 });
    } catch (error) {
        console.error("Error en el proceso:", error);
        return NextResponse.json({ error: "Error en el proceso" }, { status: 500 });
    }
}

export async function POST(request) {
    const { email, password } = await request.json();
    console.log("Email: " + email);

    // Buscar el usuario en la base de datos
    const { data, error } = await supabase
        .from('usuarios')
        .select('password_hash')
        .eq('mail', email)
        .single();

    if (error || !data) {
        console.error("Usuario no encontrado o error en la consulta:", error);
        return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, data.password_hash);
    if (!passwordMatch) {
        console.error("Contraseña incorrecta");
        return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: data.id, email: data.mail }, process.env.JWT_SECRET, { expiresIn: '10h' });

    console.log("Autenticación exitosa");
    return NextResponse.json({ token }, { status: 200 });
}