import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

const News = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/dummy-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Pratik', age: 30 })
    });

    if (res.ok) {
      console.log('User added successfully');
    } else {
      console.error('Error adding user');
    }
  };

  return (<Fragment>
    <Head>
      <title>Test123</title>
    </Head>
    <ul>
      <li><Link href='/news/next-js-is-cool'>Next.js is cool</Link></li>
      <li>Something else</li>
    </ul>
    <p>Data: </p>
    <div>{props.data}</div>
    <button onClick={handleSubmit}>Go to</button>
  </Fragment>);
}

export async function getStaticProps() {
  return {
    props: {
      data: 'test123',
    },
    revalidate: 10
  }
}

// export async function getServerSideProps(context) {
//   const { req, res } = context;
  
//   return {
//     props: 'test123',
//   }
// }

export default News;