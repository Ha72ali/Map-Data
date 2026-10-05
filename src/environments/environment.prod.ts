export const environment = {
  production: true,
  arcgisApiKey: 'AAPTaZfpOJPuvTu80oJX7Yg1pcA..wUr9-4mJBRHFkKcqUyqov4PKubC9SEVteUN3QNIT0--_lTrzgzdr3OHTNcdqsHPAIgjrCDG7AiKQQ02YJU12k6czrqJLE1A-iK0-snMhcNcly-lnpDwiD9ND3EHQIY6Vogq8Ka5KM8l2hq-EdR3KtEERe8C4PRexRNVi09V6dB4DdoWxHo31BTk7fxqbYEEqTCXhA2nfzvQmNvUpnafzDJWVYXKQnAUnrYJgJKbcIFmfjWBosQOhIUeEvQ..AT1_xO3j2Mlr' as string,
  /** Same-origin API in production when the SPA and Node API share a host. */
  mapApiBaseUrl: '' as string,
  USE_LOCAL_MAP_GEOJSON: false,
  MAP_SOURCE_MODE: 'api' as 'local' | 'api',
  MAP_ASSET_PATH: '/assets/maps',
  MAP_ALLOW_API_FALLBACK: true,
  MAP_DEFAULT_CONTRACTOR: 'MHD',
  mapGeoJsonAssetsBase: '/assets/maps' as string,
  mapGeoJsonTimeoutMs: 90_000,

  /**
   * Direct contractor-API calls. Set `baseUrl` + `contractor` per deployment,
   * or inject `window.__env.UPSTREAM_BASE_URL` in index.html so one built
   * bundle can serve several contractors. See `src/app/upstream-config.ts`.
   */
  upstream: {
    useDirectUpstream: true,
    /** Trailing '/api' and slashes are stripped by `upstreamBaseUrl()`. */
    baseUrl: 'https://ofopms.omanfiber.com/api/' as string,
    authToken: '' as string,
    contractor: 'OFO' as string,
    timeoutMs: 30_000,
    segmentsTimeoutMs: 120_000,
  },

  /**
   * Portal-handover session — no login screen. See environment.ts for the
   * full contract. In production both apps should share one origin so the
   * session flows via localStorage and no token ever hits the URL.
   */
  externalAuth: {
    /**
     * ON in production. With this false the whole portal-handover path is
     * disabled: AuthService.restoreExternalSession() returns immediately, the
     * auth guard falls back to this app's own /login screen, and the Back
     * button never renders (isHandoverTab is only ever set while capturing a
     * handover). Both these deployments sit behind the Neo Rollout portal and
     * have no local user store, so portal mode is the correct production mode —
     * it matches environment.ts, which has always had it on.
     */
    enabled: true,
    /**
     * The "Neo Rollout" portal — same origin as the contractor API, which is
     * consistent with the `baseApiUrl: "/api/"` the portal writes into the
     * session. Used for the unauthenticated bounce, logout, and the Segments /
     * Contract / Project sidebar links (which append '/#/…').
     *
     * No trailing slash: `portalUrl()` strips one anyway, but keeping it off
     * makes the concatenated result obvious.
     */
    mainAppUrl: 'https://ofopms.omanfiber.com' as string,
    storageKey: 'quickForce',
    rolesKey: 'userRoles',
    logoutKey: 'forceLogout',
    /**
     * ON in production.
     *
     * It was off on the assumption that the only handover is portal -> this app,
     * which share an origin. That is no longer the only one: the client
     * dashboard's /contractors page signs in to each contractor and opens this
     * app in a new tab, and it runs on a DIFFERENT origin from every PMS host —
     * so localStorage cannot be shared and the URL is the only channel. With
     * this false, that handover is ignored and the user is bounced to the portal
     * login instead of landing signed in.
     *
     * The cost is real and unchanged: the token travels in the query string, so
     * it reaches browser history and any access log that records URLs. The app
     * strips it from the address bar immediately on capture (see
     * ExternalSessionService.stripHandoverQuery, re-applied on every
     * NavigationEnd because the router restores it), but that does not undo the
     * server-side log entry. Turn this back off if the client dashboard is ever
     * served from the same origin as these hosts.
     */
    acceptUrlHandover: true,
  },
};
