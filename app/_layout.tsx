import { Slot } from 'expo-router';
import * as Sentry from '@sentry/react-native';

//   ██████  ██████  ██      ██
//   ██        ██    ████    ██
//   ██  ██    ██    ██  ██  ██
//   ██  ██    ██    ██    ████
//   ██████  ██████  ██      ██
//   Copyright (c) 2025 Pixelset

Sentry.init({
    dsn: 'https://ea09fd3f23290027722769498a1b6188@o4509832364687360.ingest.de.sentry.io/4510149090017360',

    sendDefaultPii: true,

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

export default Sentry.wrap(() => (
    <Slot />
));