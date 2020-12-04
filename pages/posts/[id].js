import Link from 'next/link';

// pages/posts/[id].js
export default function Page({ post }) {
  return (
    <>
      <h1>{post.pref_name}</h1>
      <p>{post.pref_name}のIDは{post.pref_id}</p>
      <p>
        <Link href="/posts">戻る</Link>
      </p>
    </>
  )
}

export async function getStaticProps( {params} ) {
  
  // `params`は`id`の記事内容を含む
  // ルートが/posts/1とすると、params.idは1となる
  const res = await fetch(`http://kinocolog.com/ajax/pref_next_test.php?id=${params.id}`);
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

export async function getStaticPaths() {
  // 記事を取得する外部APIのエンドポイントをコール
  const res = await fetch('http://kinocolog.com/ajax/pref_next_test.php');
  const posts = await res.json();

  // 記事にもとづいてプリレンダするパスを取得
  const paths = posts.map(post => `/posts/${post.pref_id}`);

  // 設定したパスのみ、ビルド時にプリレンダ
  // { fallback: false } は、他のルートが404になるという意味
  // { fallback: true } は、他のルートをスクリプトで読み込み表示させる
  // { fallback: 'blocking' } は、他のルートをサーバーサイドで読み込み表示させる
  return { paths, fallback: 'true' };
}