'use client'

import { useState } from 'react'
import { login } from '../actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  
  async function handleSubmit(formData: FormData) {
    const res = await login(formData)
    if (res?.error) {
      setError(res.error)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center container mx-auto px-6 py-20">
      <div className="max-w-md w-full border border-foreground/10 rounded-2xl p-8 bg-foreground/[0.02]">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
        
        {error && <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 text-sm">{error}</div>}
        
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-foreground text-background font-medium py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
