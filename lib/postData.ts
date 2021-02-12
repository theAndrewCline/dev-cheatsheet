import { promises as fs } from 'fs'
import { join } from 'path'

import { Post } from '../interfaces/index'

const postsDirectory = join(process.cwd(), '_posts')

const getPostSlugs = async (): Promise<string[]> => {
  return fs.readdir(postsDirectory)
}

const fileNameToPost = async (slug: string): Promise<Post> => {
  const parsedSlug = slug.replace(/.md$/, '')
  const content: Buffer = await fs.readFile(join(postsDirectory + '/' + slug))

  return {
    slug: parsedSlug,
    content: content.toString(),
  }
}

export const fetchPostData = async (): Promise<Post[]> => {
  const slugs = await getPostSlugs()
  return Promise.all(slugs.map(fileNameToPost))
}
