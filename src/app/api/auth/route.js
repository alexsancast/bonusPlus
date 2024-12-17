import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
    try {
        console.log("Request: " + request);
        const { email, password } = await request.json();
        console.log("Email: " + email);
        console.log("Password: " + password);
        // Buscar el usuario en la base de datos
        const { data, error } = await supabase
            .from('usuarios')
            .select('id, mail, name, password_hash')
            .eq('mail', email)
            .single();

        if (error || !data) {
            console.error("Usuario no encontrado o error en la consulta:", error);
            return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
        }

        // Validar la contraseña
        const passwordMatch = password === data.password_hash;
        if (!passwordMatch) {
            console.error("Contraseña incorrecta" + passwordMatch);
            return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: data.id, email: data.mail, name: data.name }, process.env.JWT_SECRET, { expiresIn: '10h' });

        console.log("Autenticación exitosa");
        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error("Error en la autenticación:", error);
        return NextResponse.json({ error: "Error en la autenticación" }, { status: 500 });
    }
}