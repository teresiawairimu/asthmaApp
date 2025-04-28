import React, {useEffect, useState} from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import ProfileForm from "../../components/Forms/ProfileForm";
import { logAsthmaInfo, updateAsthmaInfo, getAsthmaInfo } from "../../services/asthmaInfoServices";
import { updateUser, retrieveUser, deleteUser } from "../../services/userServices";
import { useAuth } from "../../context/AuthContext";
import {getAuth, signOut} from "firebase/auth";
import AsthmaInfoForm from "../../components/Forms/AsthmaInfoForm";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";  

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [asthmaData, setAsthmaData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, setUser } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        setError(null);
        const idToken = await user.getIdToken();
        console.log("idToken THIS IS THE INVALID", idToken);
        const userInfo = await retrieveUser(idToken);
        console.log("userdata", userInfo);
        setUserData(userInfo);
        const asthmaInfo = await getAsthmaInfo(idToken);
        console.log("asthmainfo", asthmaInfo);
        setAsthmaData(asthmaInfo);
      } catch (error) {
        setError("Failed to load data");
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const handleProfileUpdate = async (data) => {
    if (!user) return;
    try {
      setIsLoading(true);
      setError(null);
      const idToken = await user.getIdToken(true);
      await updateUser(user.uid, data, idToken);
      setUserData(data);
    } catch(error) {
      setError("Failed to update profile");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAsthmaInfoUpdate = async (newAsthmaData) => {
    if (!user) return;
    try {
      setIsLoading(true);
      setError(null);
      const idToken = await user.getIdToken(true);
      if (asthmaData) {
        await updateAsthmaInfo(asthmaData.id, newAsthmaData, idToken);
        setAsthmaData({...newAsthmaData, id: asthmaData.id})
      } else {
        const result = await logAsthmaInfo(newAsthmaData, idToken);
        setAsthmaData({...newAsthmaData, id: result.id})
      }
    } catch (error) {
      setError("Failed to update asthma info");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!user) return;
    const confirm = await new Promise((resolve) => {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
          { text: "Delete", style: "destructive", onPress: () => resolve(true) },
        ]
      );
    });
  
    if (!confirm) {
      return;
    }
    try {
      setIsLoading(true);
      const idToken = await user.getIdToken(true);
      await deleteUser(user.uid, idToken);
  
      const auth = getAuth();
      await signOut(auth); 
      setUser(null); 
    } catch (error) {
      setError("Failed to delete user");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>
  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <ProfileForm 
          initialData={userData} 
          onSubmit={handleProfileUpdate}
          onDelete={handleDeleteUser}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >

          <View style={styles.centeredView}>
            <AsthmaInfoForm
              initialData={asthmaData}
              onSubmit={handleAsthmaInfoUpdate} 
            />
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
        
            </Pressable>
          </View>
        </Modal>
        <Pressable
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.show}>
            <FontAwesomeIcon name="user" size={30} color="#4A90E2" />
            <Text>
              Asthma Information
            </Text>
          </View>
        </Pressable> 
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  show: {
    flexDirection: "row",
    marginTop: 20,
  },
  centeredView: {
    paddingTop: 60
  },
  mainView: {
    padding: 5,
  },
  closeButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    alignSelf: "center"
  },
  closeText: {
    color: "white",
    fontSize: 16,
    fontWeight: 600
  }
});