import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    const imagePath = path.join(process.cwd(), filename)
    
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath)
      const extension = path.extname(filename).toLowerCase()
      
      let contentType = 'image/jpeg'
      if (extension === '.png') contentType = 'image/png'
      if (extension === '.gif') contentType = 'image/gif'
      if (extension === '.svg') contentType = 'image/svg+xml'
      
      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000',
        },
      })
    } else {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 })
  }
}