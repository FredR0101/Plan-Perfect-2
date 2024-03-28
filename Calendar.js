import { SafeAreaView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

function App() {
  return (
    <SafeAreaView style={styles. Container}>
      <Calendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0a8faf'
  },
});

export default App;