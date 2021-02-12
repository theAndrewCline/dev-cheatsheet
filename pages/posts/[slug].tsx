import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '../../components/Layout'
import { fetchPostBySlug, fetchPostData } from '../../lib/postData'
import { Post } from '../../interfaces'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPostData()

  console.log(posts)

  return {
    paths: posts.map((post: Post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const post = fetchPostBySlug((params.slug + '.md') as string)

    return {
      props: {
        post,
      },
    }
  } else {
    return { props: {} }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PostPage: React.FC<Props> = ({ post }) => (
  <Layout>
    <div>{post.content}</div>
  </Layout>
)

export default PostPage
