import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, token, password } = await req.json()
    if (!email || !token || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const record = await prisma.verificationToken.findUnique({ where: { token } })
    if (!record || record.identifier !== email) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    if (new Date(record.expires) < new Date()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)

    await prisma.user.update({ where: { email }, data: { password: hashed } })

    // Optionally delete the token
    await prisma.verificationToken.delete({ where: { token } })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
