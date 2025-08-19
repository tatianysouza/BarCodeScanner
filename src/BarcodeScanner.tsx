import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "./config";

export default function BarcodeScannerScreen() {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codigoLido, setCodigoLido] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (hasPermission === null) requestPermission();
  }, [hasPermission]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Conectado ao socket");
    });

    newSocket.on("erro_produto", (data: { mensagem: string }) => {
      console.warn("Erro do servidor:", data.mensagem);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setLoading(true);
    setCodigoLido(data);

    if (socket) {
      socket.emit("adicionar_produto", {
        usuarioId: 1,
        codigo_barras: data,
      });
      console.log("Código enviado via socket:", data);
    }

    setLoading(false);
    setTimeout(() => {
      setScanned(false);
      setCodigoLido("");
    }, 1500);
  };

  if (!hasPermission) return <Text>Solicitando permissão da câmera...</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      <View style={styles.header}>
        <Text style={styles.title}>Leitor de Código de Barras</Text>
      </View>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={styles.codigo}>
            {codigoLido ? `Código lido: ${codigoLido}` : "Aguardando leitura..."}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  header: { 
    backgroundColor: "#1e1e1e", 
    paddingVertical: 10, 
    alignItems: "center" 
  },
  title: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  cameraContainer: { 
    flex: 4 
  },
  camera: { 
    flex: 1 
  },
  footer: { 
    flex: 1, 
    backgroundColor: "#fff", 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 10 
  },
  codigo: { 
    fontSize: 18, 
    color: "#333", 
    textAlign: "center" 
  },
});
