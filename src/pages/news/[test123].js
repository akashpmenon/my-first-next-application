import { useRouter } from "next/router";

const News = () => {
  const router = useRouter();

  console.log(router.query.test123);

  return <h1>Imp Test 123</h1>;
}

export async function getStaticPaths () {
  return {
    fallback: false,
    paths: [
      { 
        params: {
          test123: 'm1',
        } 
      },
      { 
        params: {
          test123: 'm2',
        } 
      }
    ]
  }
}

export async function getStaticProps (context) {
  console.log(context.params.test123);

  return {
    props: {
      meetupData: {
        id: '123',
        title: 'Title123'
      }
    }
  }
}

export default News;