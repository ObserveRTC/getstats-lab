function build_dashboard() {
    pushd dashboard
    npm ci
    npm run build
    popd
}

function build_server() {
  pushd server
  npm ci
  npm run build
  popd
}

