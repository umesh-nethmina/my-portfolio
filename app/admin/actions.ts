'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/admin')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function addProject(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const github_url = formData.get('github_url') as string
  const image_url = formData.get('image_url') as string

  const { error } = await supabase.from('projects').insert({
    title,
    description,
    github_url: github_url || null,
    image_url: image_url || null,
  })

  if (!error) {
    revalidatePath('/projects')
    revalidatePath('/admin')
  }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  await supabase.from('projects').delete().eq('id', id)
  revalidatePath('/projects')
  revalidatePath('/admin')
}

export async function addBlog(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const cover_image = formData.get('cover_image') as string

  const { error } = await supabase.from('blogs').insert({
    title,
    content,
    cover_image: cover_image || null,
  })

  if (!error) {
    revalidatePath('/blog')
    revalidatePath('/admin')
  }
}

export async function deleteBlog(id: string) {
  const supabase = await createClient()
  await supabase.from('blogs').delete().eq('id', id)
  revalidatePath('/blog')
  revalidatePath('/admin')
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const github_url = formData.get('github_url') as string
  const image_url = formData.get('image_url') as string

  const { error } = await supabase
    .from('projects')
    .update({
      title,
      description,
      github_url: github_url || null,
      image_url: image_url || null,
    })
    .eq('id', id)

  if (!error) {
    revalidatePath('/projects')
    revalidatePath('/admin')
  }
}

export async function updateBlog(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const cover_image = formData.get('cover_image') as string

  const { error } = await supabase
    .from('blogs')
    .update({
      title,
      content,
      cover_image: cover_image || null,
    })
    .eq('id', id)

  if (!error) {
    revalidatePath('/blog')
    revalidatePath('/admin')
  }
}
