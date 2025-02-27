import { describe, it } from 'vitest'
import { useHead } from 'unhead'
import { useDOMHead, useDelayedSerializedDom } from './util'

describe('templateParams', () => {
  it('basic', async () => {
    useDOMHead()

    useHead({
      templateParams: {
        site: {
          name: 'My Site',
          url: 'https://example.com',
        },
        separator: '-',
      },
      title: 'My Page',
      titleTemplate: '%s %separator %site.name',
      script: [
        {
          id: 'site-data',
          type: 'application/json',
          innerHTML: {
            pageTitle: '%s',
            siteName: '%site.name',
            siteUrl: '%site.url',
          },
        },
      ],
      meta: [
        {
          name: 'description',
          content: 'Welcome to %site.name.',
        },
        {
          property: 'og:site_name',
          content: '%site.name',
        },
        {
          property: 'og:url',
          content: '%site.url/my-page',
        },
      ],
    })

    expect(await useDelayedSerializedDom()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html><head>

      <title>My Page - My Site</title><script id=\\"site-data\\" type=\\"application/json\\">{\\"pageTitle\\":\\"My Page\\",\\"siteName\\":\\"My Site\\",\\"siteUrl\\":\\"https://example.com\\"}</script><meta name=\\"description\\" content=\\"Welcome to My Site.\\"><meta property=\\"og:site_name\\" content=\\"My Site\\"><meta property=\\"og:url\\" content=\\"https://example.com/my-page\\"></head>
      <body>

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)
  })

  it('separator', async () => {
    useDOMHead()

    useHead({
      templateParams: {
        site: {
          name: 'My Site',
        },
        separator: '-',
        subPage: null, // empty
      },
      title: 'My Page',
      titleTemplate: '%s %separator %subPage %separator %site.name',
    })

    expect(await useDelayedSerializedDom()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html><head>

      <title>My Page - My Site</title></head>
      <body>

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)
  })
})
