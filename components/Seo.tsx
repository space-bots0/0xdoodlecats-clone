import Head from 'next/head'
import { useRouter } from 'next/router'

const defaultMeta = {
  title: 'example',
  siteName: 'example',
  description: 'example',
  url: 'example',
  image: 'example',
  type: 'website',
  robots: 'follow, index',
}

type SeoProps = {
  date?: string
  templateTitle?: string
  isBlog?: boolean
  banner?: string
} & Partial<typeof defaultMeta>

export default function Seo(props: SeoProps) {
  const router = useRouter()
  const meta = {
    ...defaultMeta,
    ...props,
  }
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title

  return (
    <Head>
      <title>0xDoodleCats</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />

      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />

      <meta name='twitter:site' content='' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta name='author' property='article:author' content='' />
        </>
      )}
    </Head>
  )
}
