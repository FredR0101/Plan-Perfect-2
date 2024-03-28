import { useState, useEffect} from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { auth, db} from "./firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export const Calendar = () =>  {
  const [events, setEvents] = useState()

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const fetchData = collection(db, "test-itineraries");
    const userQuery = query(fetchData, where("uid", "==", uid));
    
    getDocs(userQuery)
    .then((data) => {
      const itineraryData = [];
      data.docs.forEach((doc) => {
        itineraryData.push({ ...doc.data(), id: doc.id });
      });
      const formattedEvents = formatEventsForCalendar(itineraryData)
      setEvents(formattedEvents)
    });
  }, []);
  const formatEventsForCalendar = (events) => {
    const formattedEvents = {}
    events.forEach((event) => {
      const { uid, name, startDate} = event;
      formattedEvents[startDate] = formattedEvents[startDate] || [];
      formattedEvents[startDate].push({
        uid,
        name,
        start: startDate
      })
  })
  return formattedEvents
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={events}
        renderItem={(item, isFirst) => (
          <Pressable style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0a8faf',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  }
});

