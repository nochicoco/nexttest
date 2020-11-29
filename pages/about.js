function About({ post }) {
  return <div>{ JSON.stringify(post) }</div>;
}

export async function getStaticProps() {
  
  // `params`は`id`の記事内容を含む
  // ルートが/posts/1とすると、params.idは1となる
  const res = await fetch(`${process.env.WEBAPP_URL}/api/posts`);
  const post = await res.json();
  
  //データが取得できない時は404ページ
  //https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
  if (!post) {
    return {
      notFound: true,
    }
  }

  // propsを通じてpostをページに渡す
  return { 
    props: { post },
    revalidate: 60,
  };
}

export default About;