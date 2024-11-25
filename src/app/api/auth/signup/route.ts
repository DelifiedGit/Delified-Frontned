import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, fullName, userName, gender, dob, contactNumber, password, institution } = body

    // 1. Validate the input
    if (!email || !fullName || !userName || !gender || !dob || !contactNumber || !password || !institution) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // 2. Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    // 3. Hash the password
    const saltRounds = 10
    const hashedPassword = await bcryptjs.hash(password, saltRounds)

    // 4. Store the user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        userName,
        gender,
        dateOfBirth: new Date(dob),
        contactNumber,
        password: hashedPassword,
        institution
      }
    })

    // 5. Generate a JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '1d' })

    // 6. Set the token in a secure HTTP-only cookie
    const response = NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}