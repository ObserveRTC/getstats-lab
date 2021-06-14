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

function build_docker() {
  echo 'run $build_server before build docker'
  docker build --no-cache -t getstats-lab .
}

function run_docker() {
  docker run -it -p 8080:8080 --rm --name getstats-lab getstats-lab -u 'browserstack username' -k 'browserstack key' -p 8080
}
