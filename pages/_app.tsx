import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MeetMind" />
        <meta property="og:description" content="Paste a transcript or jot the topic and get AI-generated meeting minutes in seconds \u2014 a tight summary, the key decisions, and action items with owners and due dates." />
        <meta property="og:url" content="https://meeting-mind-mvp.lxsaihub.com/" />
        <meta property="og:image" content="https://meeting-mind-mvp.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MeetMind" />
        <meta name="twitter:description" content="Paste a transcript or jot the topic and get AI-generated meeting minutes in seconds \u2014 a tight summary, the key decisions, and action items with owners and due dates." />
        <meta name="twitter:image" content="https://meeting-mind-mvp.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"MeetMind","url":"https://meeting-mind-mvp.lxsaihub.com/","description":"Paste a transcript or jot the topic and get AI-generated meeting minutes in seconds \\u2014 a tight summary, the key decisions, and action items with owners and due dates.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
