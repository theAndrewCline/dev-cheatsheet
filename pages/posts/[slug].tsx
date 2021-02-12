import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import { fetchPostBySlug, fetchPostData } from '../../lib/postData'
import { Post } from '../../interfaces'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPostData()

  const paths = posts.map((post: Post) => {
    return {
      params: {
        slug: post.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetchPostBySlug((params?.slug + '.md') as string)

  return {
    props: {
      post,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PostPage: React.FC<Props> = ({ post }) => (
  <Layout>
    <ReactMarkdown>{post.content}</ReactMarkdown>
  </Layout>
)

export default PostPage
