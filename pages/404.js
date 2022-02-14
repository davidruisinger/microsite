import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => (
  <div className="container">
    <Head>
      <title>404 - Page Not Found</title>
      <meta content="Page not found" name="description" />
    </Head>

    <div className="container">
      <h1>Page Not Found</h1>
      <p>
        Please return{' '}
        <Link href="/">
          <a>home</a>
        </Link>{' '}
        or use the menu to navigate to a different page.
      </p>
    </div>
  </div>
)

export default NotFoundPage
