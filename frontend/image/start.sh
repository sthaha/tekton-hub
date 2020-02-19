#!//bin/bash
set -e -u -o pipefail

echo "Current ENV"
cat /usr/share/nginx/html/env.js
echo '----------------------------------------------'

cat <<-EOF >/usr/share/nginx/html/env.js
window.config = {
  API_URL: '$API_URL',
  GH_CLIENT_ID: '$GH_CLIENT_ID',
};


// TODO(sthaha): remove debug message
console.debug("application config", window.config);
EOF

echo "Modified ENV"
cat /usr/share/nginx/html/env.js
echo '----------------------------------------------'


echo Starting Nginx
exec nginx -g 'daemon off;'
