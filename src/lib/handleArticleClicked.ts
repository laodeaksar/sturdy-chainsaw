import router from 'next/router';

export function handleArticleClicked(slug: string) {
  const localData = JSON.parse(localStorage.getItem(slug) as string);

  if (typeof window !== 'undefined') {
    localStorage.setItem(
      slug,
      JSON.stringify({ ...localData, has_read: true })
    );
  }

  router.push(`/blog/${slug}`);
}
