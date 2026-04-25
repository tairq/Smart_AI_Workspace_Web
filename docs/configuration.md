# Configuration

## Site Config

Global metadata and social links live in `src/config/site.ts`. Navigation items live in `src/config/navigation.ts`. Update these (not inline values) for site-wide changes.

## Environment Variables

See `.env.example` for all required variables. Key ones:

- `N8N_CONTACT_WEBHOOK_URL` — n8n webhook for contact form submissions
- `N8N_API_URL` / `N8N_API_KEY` — n8n instance connection for MCP server
