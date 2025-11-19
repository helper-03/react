import { Platform } from 'react-native';

const Colors = {
  background: '#0F172A',
  card: '#1E293B',
  primary: '#0EA5E9',
  primaryDark: '#0284C7',
  accent: '#06B6D4',
  success: '#10B981',
  danger: '#EF4444',
  text: '#F1F5F9',
  muted: '#94A3B8',
  border: '#334155',
  subtle: '#1A234F',
};

const Typography = {
  h1: 28,
  h2: 22,
  h3: 18,
  body: 16,
  small: 13,
  weightBold: '700',
  weightSemibold: '600',
};

const Metrics = {
  padding: 18,
  radius: 18,
  avatarLarge: 120,
  avatarMedium: 44,
  avatarSmall: 40,
};

const Shadows = Platform.select({
  ios: {
    shadowColor: '#0B1220',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
  },
  android: {
    elevation: 6,
  },
});

export default {
  Colors,
  Metrics,
  Typography,
  Shadows,
};
