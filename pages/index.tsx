import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Post } from '../interfaces/index'
import Layout from '../components/Layout'
import { fetchPostData } from '../lib/postData'

export const getStaticProps: GetStaticProps = async () => {
  const posts: Post[] = await fetchPostData()

  return {
    props: { posts },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const IndexPage: React.FC<Props> = ({ posts }) => (
  <Layout title="Dev Cheatsheet">
    <div className="flex flex-col items-center justify-center min-h-screen bg-white mx-8">
      <h1 className="flex justify-center w-full p-12 text-3xl font-bold bg-yellow-300 border-2 border-black rounded shadow-2xl">
        Andrew's Dev Cheatsheet
      </h1>
      {posts.map((post: Post) => (
        <Link href={`posts/${post.slug}`}>
          <a className="p-8 m-2 text-xl font-bold bg-blue-300 border-2 border-black rounded shadow-2xl hover:bg-blue-400">
            {post.slug}
          </a>
        </Link>
      ))}
    </div>
  </Layout>
)

export default IndexPage
