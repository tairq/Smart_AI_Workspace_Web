# n8n Backend

Next.js API routes call n8n webhooks. The website never calls external services directly — n8n orchestrates everything. The n8n-mcp server (`.mcp.json`) lets you build and manage workflows directly from Claude Code.

Seven n8n-specific Claude Code skills are in `.claude/skills/` and activate automatically when working on n8n workflows (expressions, node config, validation, patterns, JS/Python code nodes).
