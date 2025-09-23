import fs from 'fs';
import path from 'path';
import { NextResponse, NextRequest } from 'next/server';


// export function getStaticProps(dir: string) {
//     const pathDir = path.join(process.cwd(), "/public/" + dir)
//     const files = fs.readdirSync(pathDir);
//     const paths = files.map(f => `/${dir}/${f}`);
//     return paths
// }

export async function GET() {
    const pathDir = path.join(process.cwd(), "/public/backgrounds");
    const entries = fs.readdirSync(pathDir);
    const files = entries.filter((entry) => {
        const fullPath = path.join(pathDir, entry);
        return fs.statSync(fullPath).isFile();
    })
    const paths = files.map(f => `/backgrounds/${f}`);
    return new Response(
        JSON.stringify(paths),
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );

}