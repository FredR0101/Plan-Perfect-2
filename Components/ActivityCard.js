import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const ActivityCard = ({ activity }) => {

  const handleDeleteButton = (value) =>  {
    console.log(value)

  }




  return (

    <View style={styles.activityCard}>
      <Image
        style={{
          height: "50%",
          width: "100%",
          border: "1px solid black",
          borderRadius: "5%",
        }}
        source={{
          uri: activity.image,
        }}
      />
      <Text style={{textAlign: 'center', fontWeight: 'bold', paddingBottom: 5}}>{activity.name}</Text>
      <Text style={styles.activityInfo}>{activity.description}</Text>
      <Text style={styles.activityInfo}>Location: {activity.location}</Text>
      <Text style={styles.activityInfo}>Price: £{activity.price}</Text>
      <Text style={styles.activityInfo}>Date: {activity.date}</Text>
      <Text style={styles.activityInfo}>
        Number of people: {activity.people}
      </Text>
      <Pressable onPress ={handleDeleteButton}>
        <Text style= {{backgroundColor: '#7743DB', border: '1px solid #C3ACD0', color: 'white', height: 30, width: 100, textAlign: 'center', marginTop: 10,  paddingTop: 5 }}>Delete activity</Text>
      </Pressable>
    </View>
  );
};

export const styles = StyleSheet.create({
  activityCard: {
    marginTop: 70,
    border: '1px solid black',
    backgroundColor: '#C3ACD0',
    height: 300,

  },
  activityInfo: {
    textAlign: "left",
    
  },
});
export default ActivityCard;
