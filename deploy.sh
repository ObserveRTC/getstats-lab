function build_dashboard() {
    pushd dashboard
    npm ci
    rm -rf build
    npm run build
    popd
}

function build_server() {
  pushd server
  npm ci
  rm -rf dist
  npm run build
  popd
}

