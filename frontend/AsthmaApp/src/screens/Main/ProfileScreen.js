import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import ProfileForm from "../../components/Forms/ProfileForm";
import { logAsthmaInfo, updateAsthmaInfo, getAsthmaInfo } from "../../services/asthmaInfoServices";
import { updateUser, retrieveUser } from "../../services/userServices";
import { useAuth } from "../../context/AuthContext";
import AsthmaInfoForm from "../../components/Forms/AsthmaInfoForm";

const ProfileScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [asthmaData, setAsthmaData] = useState(null);
  const { user } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        setError(null);
        const idToken = await user.getIdToken(true);
        const userInfo = await retrieveUser(user.uid, idToken);
        setUserData(userInfo);
        const asthmaInfo = await getAsthmaInfo(UserActivation.uid, idToken);
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
  }

  const handleAsthmaInfoUpdate = async (data) => {
    if (!user) return;
    try {
      setIsLoading(true);
      setError(null);
      const idToken = await user.getIdToken(true);
      if (asthmaData) {
        await updateAsthmaInfo(user.uid, data, idToken);
      } else {
        await logAsthmaInfo(user.uid, data, idToken);
      }
      setAsthmaData(data);
    } catch (error) {
      setError("Failed to update asthma info");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>
  return (
    <View>
      <ProfileForm 
        initialData={userData} 
        onSubmit={handleProfileUpdate}
      />
      <AsthmaInfoForm
        initialData={asthmaData}
        onSubmit={handleAsthmaInfoUpdate} 
      />
  
      

    </View>
  );
};

export default ProfileScreen;