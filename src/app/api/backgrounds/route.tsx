import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';


export async function GET() {
    const pathDir = path.join(process.cwd(), "/public/backgrounds");
    const entries = fs.readdirSync(pathDir);
    const files = entries.filter((entry) => {
        const fullPath = path.join(pathDir, entry);
        return fs.statSync(fullPath).isFile();
    })
    const paths = files.map(f => `/backgrounds/${f}`);
    return NextResponse.json(
        paths,
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );

}