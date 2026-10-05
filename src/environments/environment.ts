/**
 * Set `arcgisApiKey` to an Esri developer API key for basemaps and services.
 * https://developers.arcgis.com/documentation/mapping-apis-and-services/security/api-keys/
 */
export const environment = {
  production: false,
  /** Paste your key here for local dev, or wire `fileReplacements` in angular.json for prod. */
  arcgisApiKey: 'AAPTaZfpOJPuvTu80oJX7Yg1pcA..wUr9-4mJBRHFkKcqUyqov4PKubC9SEVteUN3QNIT0--_lTrzgzdr3OHTNcdqsHPAIgjrCDG7AiKQQ02YJU12k6czrqJLE1A-iK0-snMhcNcly-lnpDwiD9ND3EHQIY6Vogq8Ka5KM8l2hq-EdR3KtEERe8C4PRexRNVi09V6dB4DdoWxHo31BTk7fxqbYEEqTCXhA2nfzvQmNvUpnafzDJWVYXKQnAUnrYJgJKbcIFmfjWBosQOhIUeEvQ..AT1_xO3j2Mlr' as string,
  /**
   * Map GeoJSON API origin. Empty string uses same-origin `/api` (ng serve + proxy.conf.json → Node on :4000).
   */
  mapApiBaseUrl: '' as string,
  /**
   * false = fetch live geometry from the contractor API instead of the bundled
   * snapshots in MAP_ASSET_PATH. Those snapshots do not update, so they drift
   * from the real data over time; set this back to true only for offline demos.
   */
  USE_LOCAL_MAP_GEOJSON: false,
  /** `local` = assets first; `api` = contractor API first. */
  MAP_SOURCE_MODE: 'api' as 'local' | 'api',
  /** Angular assets path for contractor GeoJSON (see angular.json → assets). */
  MAP_ASSET_PATH: '/assets/maps',
  /** When local bundle is missing, allow GET /api/map/geojson/* (set false for offline-only). */
  MAP_ALLOW_API_FALLBACK: true,
  /** Default contractor bundle when none is selected (ALL). */
  MAP_DEFAULT_CONTRACTOR: 'MHD',
  /** @deprecated use MAP_ASSET_PATH */
  mapGeoJsonAssetsBase: '/assets/maps' as string,
  /** Per-request timeout for map GeoJSON (ms). */
  mapGeoJsonTimeoutMs: 90_000,

  /**
   * Direct calls to the contractor's own API server, bypassing the Node
   * gateway. Overridable at deploy time via `window.__env` — see
   * `src/app/upstream-config.ts` for precedence.
   *
   * Only the endpoints listed in `UpstreamApiService.SUPPORTED` exist upstream;
   * every other dashboard endpoint is computed by the gateway and still needs
   * it. Leave `useDirectUpstream: false` to route everything through Node.
   */
  upstream: {
    useDirectUpstream: true,
    /**
     * Either form works — a trailing '/api' (and trailing slashes) are
     * stripped by `upstreamBaseUrl()`, since service paths already carry
     * '/api/'. 'https://tcpms.mhditics.com' is the same as the value below.
     */
    /**
     * Dev only: '/upstream' goes through the `ng serve` proxy
     * (proxy.conf.json -> https://pms.aljassargroup.com), because that
     * server sends no CORS headers and the browser blocks direct calls from
     * localhost. Production (environment.prod.ts) still calls it directly.
     */
    baseUrl: '/upstream' as string,
    /**
     * Fallback token for direct contractor calls when there is no portal
     * session. A live `quickForce` session always wins over this.
     *
     * NOTE: this value is compiled into the bundle and is readable by anyone
     * who loads the app. The JWT below has no `exp` claim, so it does not
     * self-expire — treat it as a long-lived shared credential and rotate it
     * server-side rather than relying on expiry.
     */
    authToken:
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMCIsInBsYXRmb3JtIjoiV0VCIiwic3YiOjMwMiwiaWF0IjoxNzg0NjE1NDA5fQ.fDASlSscuddxdJp21yp7lzXc2hrbXN15et7_8o17lRJN5VDiembbFIM-vn0PSvJLM5n95XkJXy_T_y4TY1ljiA' as string,
    /** Contractor this deployment serves, e.g. 'MHD'. */
    contractor: 'OFO' as string,
    timeoutMs: 30_000,
    /** Segment payloads are large; some backends take 60s+. */
    segmentsTimeoutMs: 120_000,
  },

  /**
   * Portal-handover session — no login screen in this app.
   *
   * Mirrors neotecx_dashbaord_ui: a separate portal owns login and drops the
   * session into localStorage. This app only reads it, and bounces to
   * `mainAppUrl` when it is missing. Keys match the portal's exactly so both
   * apps share one session when served from the same origin.
   *
   * `enabled: false` keeps the built-in /login screen and the httpOnly-cookie
   * refresh flow. Turning it on disables /login entirely.
   */
  externalAuth: {
    enabled: true,
    /** Portal that owns login. Unauthenticated users are sent here. */
    mainAppUrl: 'https://ofopms.omanfiber.com' as string,
    /** localStorage key holding `{ accessToken, ... }`. */
    storageKey: 'quickForce',
    /** localStorage key holding the roles/permissions array. */
    rolesKey: 'userRoles',
    /** Cross-tab logout broadcast key (see the `storage` listener). */
    logoutKey: 'forceLogout',
    /**
     * Accept `?data=`/`?roles=` base64 handover in the URL. The portal needs
     * this when the two apps are on different origins (dev), because
     * localStorage is not shared across origins. Leave off in production
     * same-origin deployments — a token in the URL lands in browser history
     * and server logs.
     */
    acceptUrlHandover: true,
  },
};
