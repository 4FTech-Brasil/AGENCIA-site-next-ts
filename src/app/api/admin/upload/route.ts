import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
        }

        // Validar tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                error: 'Tipo de arquivo não permitido. Use JPEG, PNG, WebP ou GIF.'
            }, { status: 400 });
        }

        // Validar tamanho (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({
                error: 'Imagem muito grande. Máximo 5MB.'
            }, { status: 400 });
        }

        // Validar nome do arquivo
        if (file.name.length > 100) {
            return NextResponse.json({
                error: 'Nome do arquivo muito longo.'
            }, { status: 400 });
        }

        // Criar diretório se não existir
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'blogs', 'images');
        await mkdir(uploadsDir, { recursive: true });

        // Gerar nome único para o arquivo
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const filePath = path.join(uploadsDir, fileName);

        // Converter File para Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Validar se é uma imagem válida (verificação básica)
        if (buffer.length < 10) {
            return NextResponse.json({ error: 'Arquivo de imagem inválido' }, { status: 400 });
        }

        // Salvar arquivo
        await writeFile(filePath, buffer);

        console.log(`✅ Imagem salva: ${fileName} (${file.size} bytes)`);

        // Retornar URL da imagem
        const imageUrl = `/uploads/blogs/images/${fileName}`;

        return NextResponse.json({
            success: true,
            imageUrl,
            fileName,
            fileSize: file.size
        });

    } catch (error) {
        console.error('❌ Erro no upload:', error);
        return NextResponse.json({
            error: 'Erro interno no servidor durante o upload'
        }, { status: 500 });
    }
}