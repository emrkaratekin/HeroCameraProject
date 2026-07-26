import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📸 Camera Lab Info</Text>

      {/* --- KİMLİK KARTI --- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Student Information</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Student Name:</Text>
          <Text style={styles.value}>Emir Karatekin</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Student ID:</Text>
          <Text style={styles.value}>40795</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Course:</Text>
          <Text style={styles.value}>Hybrid Mobile App Dev. L1</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Teacher:</Text>
          <Text style={styles.value}>Piotr Bilski</Text>
        </View>
      </View>

      {/* --- TEKNİK DETAYLAR (CAMERA) --- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How It Works?</Text>
        
        <Text style={styles.text}>
          <Text style={styles.highlight}>1. Expo Camera Integration:</Text>{"\n"}
          This project uses the <Text style={styles.code}>expo-camera</Text> library to access the device's hardware camera. It handles real-time permissions requests.
        </Text>

        <Text style={styles.text}>
          <Text style={styles.highlight}>2. Capturing Photos:</Text>{"\n"}
          The app uses the <Text style={styles.code}>takePictureAsync()</Text> method to capture a high-quality image. The image data is temporarily stored in the app's cache.
        </Text>

        <Text style={styles.text}>
          <Text style={styles.highlight}>3. State Management:</Text>{"\n"}
          React State (useState) is used to switch between "Profile Mode" and "Camera Mode", and to update the hero's avatar dynamically after a photo is taken.
        </Text>
      </View>

      <Text style={styles.footer}>© 2025 Hero Camera Project | ID: 40795</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#263238', 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#90A4AE',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#37474F',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#29B6F6', 
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#546E7A',
    paddingBottom: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#455A64',
    paddingBottom: 5,
    flexWrap: 'wrap'
  },
  label: {
    color: '#B0BEC5',
    fontSize: 15,
    fontWeight: '600',
    flex: 1
  },
  value: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right'
  },
  text: {
    color: '#ECEFF1',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  highlight: {
    color: '#66BB6A', 
    fontWeight: 'bold',
  },
  code: {
    fontFamily: 'monospace',
    backgroundColor: '#263238',
    color: '#FFCC80',
    paddingHorizontal: 4,
  },
  footer: {
    textAlign: 'center',
    color: '#546E7A',
    marginTop: 10,
    marginBottom: 30,
    fontSize: 12
  }
});