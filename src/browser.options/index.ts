export const chromeBypassUserMediaOptions = {
    'goog:chromeOptions': {
        'args': ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream']
    }
}

export const firefoxBypassUserMediaOptions = {
    'moz:firefoxOptions': {
        prefs: {
            'media.navigator.streams.fake': true,
            'media.navigator.permission.disabled': true,
            'media.autoplay.default': 0,
            'media.volume_scale': '0.0'
        }
    }
}

export const edgeBypassUserMediaOptions = {
    'ms:edgeOptions': {
        'args': ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream']
    }
}
