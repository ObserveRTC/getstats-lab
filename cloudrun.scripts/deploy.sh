function build_dashboard() {
    pushd dashboard
    npm ci
    npm run build
    popd
}



