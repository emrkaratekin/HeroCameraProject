import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HeroCameraApp() {
  // --- STATE (DEĞİŞKENLER) ---
  const [facing, setFacing] = useState<CameraType>('back'); // Kamera yönü (Ön/Arka)
  const [permission, requestPermission] = useCameraPermissions(); // İzin durumu
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Kamera açık mı?
  
  // Kahraman Bilgileri
  const [heroName, setHeroName] = useState("Dragon Slayer");
  const [heroImage, setHeroImage] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);

  // --- İZİN KONTROLÜ ---
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // --- KAMERA YÖNÜNÜ DEĞİŞTİR ---
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // --- FOTOĞRAF ÇEKME ---
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: false,
        });

        if (photo?.uri) {
            setHeroImage(photo.uri); // Resmi profile kaydet
            setIsCameraOpen(false);  // Kamerayı kapat
            Alert.alert("Success", "Hero profile updated!");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to take picture.");
      }
    }
  };

  // --- 1. KAMERA EKRANI (AÇIKSA) ---
  if (isCameraOpen) {
    return (
      <View style={styles.fullScreenCamera}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.ctrlBtn} onPress={() => setIsCameraOpen(false)}>
              <Text style={styles.textBtn}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snapBtn} onPress={takePicture}>
              <View style={styles.snapInner} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.ctrlBtn} onPress={toggleCameraFacing}>
              <Text style={styles.textBtn}>Flip</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  // --- 2. PROFİL EKRANI (ANA EKRAN) ---
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🛡️ Hero Creator</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Hero Name:</Text>
        <TextInput 
            style={styles.input}
            value={heroName}
            onChangeText={setHeroName}
            placeholder="Enter hero name..."
        />

        <Text style={styles.label}>Profile Picture:</Text>
        <View style={styles.imageWrapper}>
            {heroImage ? (
                <Image source={{ uri: heroImage }} style={styles.profileImage} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={{fontSize: 40}}>👤</Text>
                    <Text style={{color:'#aaa'}}>No Image</Text>
                </View>
            )}
        </View>

        <TouchableOpacity style={styles.cameraButton} onPress={() => setIsCameraOpen(true)}>
            <Text style={styles.btnText}>📸 Take Photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerInfo}>
        Lab 11: Use the camera to capture your hero's avatar.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Genel Stil
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ECEFF1',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#37474F',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center'
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#455A64',
    marginBottom: 5,
    marginTop: 10
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  imageWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: '#29B6F6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    marginVertical: 15,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#29B6F6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  footerInfo: {
    marginTop: 30,
    color: '#90A4AE',
    fontSize: 12
  },
  message: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16
  },

  // Kamera Stilleri
  fullScreenCamera: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  snapBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
  },
  ctrlBtn: {
    padding: 10,
  },
  textBtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  }
});