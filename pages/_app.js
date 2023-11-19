import * as React from 'react'
import NextApp from 'next/app'
import '../styles/app.css'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import ForceTheme from '../components/force-theme'
import Flag from '../components/flag'
import NProgress from '../components/nprogress'
import Meta from '../components/meta'
import Head from 'next/head'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Meta
          as={Head}
          name="Join Us At Runic!" // site name
          title="Join Us At Runic!" // page title
          description="" // page description
          image="https://cloud-bs04w09ot-hack-club-bot.vercel.app/0image.png" // large summary card image URL
          color="#ec3750" // theme color
        />
        <Flag />
        <NProgress color={'#ec3750'} />
        <ForceTheme theme="light" />
        <div
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              height: '100vh',
              width: '100vw',
              backgroundImage: 'url("/msw-bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom-left',
              overflowY: 'scroll'
            }}
          >
            <Component {...pageProps} />
          </div>
        </div>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;0,9..40,1000;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900;1,9..40,1000&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');



          * {
            box-sizing: border-box;
          }
        `}
        </style>
      </ThemeProvider>
    )
  }
}
