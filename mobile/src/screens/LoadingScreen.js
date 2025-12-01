import React from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

export default function LoadingScreen() {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  React.useEffect(() => {
    // Animasi paralel: fade in + scale
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.content, 
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }] 
        }
      ]}>
        {/* Logo Image */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/LogoIOT.png')} // Path ke gambar
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        
        {/* App Name */}
        <Text style={styles.appName}>BANJIR MONITOR</Text>
        <Text style={styles.appSystem}>SYSTEM</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>Sistem Pemantauan Banjir Real-time</Text>
        
        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Memuat...</Text>
          <View style={styles.loadingBar}>
            <Animated.View style={[styles.loadingProgress]} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe', // Blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '80%',
  },
  logoContainer: {
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    textAlign: 'center',
  },
  appSystem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 3,
    marginTop: -5,
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  loadingText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 8,
  },
  loadingBar: {
    width: 150,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
    width: '30%', // Progress bar pendek
  },
});