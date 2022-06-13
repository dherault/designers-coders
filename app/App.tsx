import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { Text, View } from 'designers-coders'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text>Open up App.tsx to start working on your app!</Text>
      <View style={styles.row}>
        <Text style={styles.caption}>1</Text>
        <Text style={styles.caption}>2</Text>
        <Text style={styles.caption}>3</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.caption}>4</Text>
        <Text style={styles.caption}>5</Text>
        <Text style={styles.caption}>6</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    marginTop: 24,
    flexDirection: 'row',
  },
  caption: {
    marginRight: 12,
    fontSize: 24,
  },
})
