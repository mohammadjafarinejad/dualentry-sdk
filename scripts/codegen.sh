#!/usr/bin/env sh
# scripts/codegen.sh
#
# Downloads the latest DualEntry OpenAPI spec and regenerates all derived types.
# Run this whenever DualEntry publishes an API update.
#
# Requirements:
#   Node.js 20+, npx (comes with Node)

set -eu

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SPEC_URL="https://docs.dualentry.com/developers/openapi/resources-v2.json"
SPEC_FILE="$REPO_ROOT/openapi/resources-v2.json"
TYPES_OUT="$REPO_ROOT/packages/typescript/src/generated/types.ts"
CONST_OUT="$REPO_ROOT/packages/typescript/src/generated/constants.ts"

step() { printf '\n── %s...\n' "$1"; }

step "Downloading OpenAPI spec"
curl --silent --fail --location "$SPEC_URL" -o "$SPEC_FILE"
echo "   Saved to openapi/resources-v2.json"

step "Generating TypeScript types"
npx --yes openapi-typescript "$SPEC_FILE" --output "$TYPES_OUT"
echo "   Written to packages/typescript/src/generated/types.ts"

step "Generating API path constants"
node -e "
const spec = require('$SPEC_FILE');
const baseUrl = spec.servers?.[0]?.url;
if (!baseUrl) throw new Error('No base URL found in OpenAPI spec servers');
const paths = Object.keys(spec.paths)
  .filter(p => p.match(/^\/public\/v2\/(invoices|bills|customers|vendors|journal-entries)\/$/))
  .map(p => {
    const name = p.split('/')[3].toUpperCase().replace('-', '_');
    return \`  \${name}: '\${p}',\`;
  });
process.stdout.write([
  '/** This file was auto-generated. Do not edit. */',
  '',
  'type HttpMethod = \"GET\" | \"POST\" | \"PUT\" | \"PATCH\" | \"DELETE\";',
  \`const DEFAULT_BASE_URL = '\${baseUrl}';\`,
  'const API_PATHS = {',
  ...paths,
  '} as const;',
  '',
  'export { HttpMethod, DEFAULT_BASE_URL, API_PATHS };',
  '',
].join('\n'));
" > "$CONST_OUT"
echo "   Written to packages/typescript/src/generated/constants.ts"

echo ""
echo "Done. Run 'npm run typecheck' in packages/typescript to verify."
