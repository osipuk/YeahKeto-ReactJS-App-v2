#!/bin/bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/3e03f132f3ae69839bd7434d37bf73e9/purge_cache" \
     -H "X-Auth-Email: admin@starlightgroup.io" \
     -H "X-Auth-Key: 96bdc353bfd0e15d845b8d3dc20315d9127ed" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
