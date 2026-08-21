# Domain and search setup

The only canonical production origin is `https://francozeta.com`.

## Current live state

Checked on August 20, 2026:

| Request | Current response | Required response after deployment |
| --- | --- | --- |
| `https://francozeta.com/` | `200` with the previous build's Vercel canonical | `200` with an apex self-canonical |
| `https://www.francozeta.com/writing` | `308` to the same apex path | No change required |
| `https://francozeta.vercel.app/writing` | `308` to the same apex path | No change required |

The two domain redirects are configured in Vercel. The live apex still emits `https://francozeta.vercel.app` in canonical, Open Graph, and JSON-LD fields because the code changes in this workspace have not been deployed. Do not request Google indexing until the new production deployment is active.

## 1. Deploy the canonical-domain build

Deploy the current workspace to the Vercel production environment. If the project is connected to Git, merge or push the intended commit to the production branch, normally `main`.

After Vercel marks the deployment as Ready, open `https://francozeta.com` and confirm the new title and client-facing introduction appear.

## 2. Vercel domain settings

Open **Vercel Dashboard → francozeta project → Settings → Domains**.

### `francozeta.com`

- Assignment: the `Production` environment for this project.
- Redirect: none. This is the destination domain.
- DNS: keep the records Vercel reports as **Valid Configuration**. Do not replace a valid apex record with a copied IP from an unrelated project.
- SSL: Vercel-managed certificate.

### `www.francozeta.com`

1. Select **Edit** beside `www.francozeta.com`.
2. In **Redirect to**, select `francozeta.com`.
3. Save.

Vercel documents this flow under [Deploying and Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting). The application also defines a permanent same-path redirect as a fallback.

### `francozeta.vercel.app`

Keep the default Vercel hostname attached to the project. The application-level host redirect in `next.config.ts` sends it permanently to `https://francozeta.com` while preserving the path and query string.

### Verify redirects

Run these checks after deployment:

```powershell
curl.exe -I http://francozeta.com/
curl.exe -I https://www.francozeta.com/writing
curl.exe -I https://francozeta.vercel.app/writing/building-is-a-strange-way-to-refuse-reality
```

Each redirect must have a `Location` on `https://francozeta.com` with the same path. The final apex request must return `200`.

## 3. Google Search Console

Google's [Domain property](https://support.google.com/webmasters/answer/34592?hl=en) is the correct property type because it includes the apex, `www`, other subdomains, HTTP, and HTTPS.

1. Open [Google Search Console](https://search.google.com/search-console).
2. Use the property selector and select **Add property**.
3. Select **Domain**.
4. Enter exactly `francozeta.com`, without `https://`, `www`, or a trailing slash.
5. Choose the DNS `TXT` verification record and copy the complete value beginning with `google-site-verification=`.
6. In Vercel, open **Domains → francozeta.com → DNS Records → Add Record** and enter:

| Field | Value |
| --- | --- |
| Type | `TXT` |
| Name | `@` or leave blank if Vercel represents the apex that way |
| Value | The complete value supplied by Search Console |
| TTL | Default / automatic |

7. Return to Search Console and select **Verify**. DNS may take time to propagate. Keep the TXT record after verification; removing it can remove ownership verification. Google's current DNS instructions are in [Verify your site ownership](https://support.google.com/webmasters/answer/9008080?hl=en).

The `GOOGLE_SITE_VERIFICATION` environment variable is available only as an optional HTML-tag method for a URL-prefix property. It is not needed for the recommended Domain property.

## 4. Submit the sitemap

After verification:

1. Open **Indexing → Sitemaps**.
2. Submit `sitemap.xml`, producing `https://francozeta.com/sitemap.xml`.
3. Wait for the status to become **Success**.

The sitemap contains absolute apex-domain URLs and is also declared in `robots.txt`. Google treats sitemap submission as a discovery hint, not a ranking or indexing guarantee; see [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=en).

## 5. Request indexing for priority pages

Use the Search Console inspection bar with each complete URL. Run **Test live URL**, then **Request indexing**:

1. `https://francozeta.com/`
2. `https://francozeta.com/about`
3. `https://francozeta.com/work`
4. `https://francozeta.com/work/kocteau`
5. `https://francozeta.com/work/stepper`
6. `https://francozeta.com/writing`
7. `https://francozeta.com/writing/building-is-a-strange-way-to-refuse-reality`

Request each URL once. Repeating the request does not make crawling faster, and Google states that discovery can still take days or weeks; see [Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## 6. Build the `francozeta` entity signal

- Change every public profile link from `francozeta.vercel.app` to `https://francozeta.com`.
- Use the same display name, `Franco Zeta`, on GitHub, LinkedIn, X, Peerlist, and other profiles.
- Link back to those profiles from the portfolio. The current `Person` and `ProfilePage` JSON-LD already connect them through `sameAs`.
- Publish original writings and keep the author identity visible. The new essay automatically appears in the writing collection, sitemap, JSON-LD, and `llms-full.txt`.
- In Search Console Performance, monitor queries for `francozeta`, `franco zeta`, `kocteau`, and relevant service terms after data begins to appear.

Search Console verification and a sitemap make discovery easier. They cannot guarantee a first-position result for a name; consistency, original content, external profile links, mentions, and time establish that association.

## Future Spanish locale

The Spanish translation is stored internally and is not public or indexable. When a complete Spanish experience is ready, use `/es/...` URLs, translate the navigation and metadata as well as the article body, use self-referencing canonicals, and connect equivalent English and Spanish pages with reciprocal `hreflang` entries plus `x-default`.
