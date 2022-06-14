// import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { DesignersCoders, Text, View } from 'designers-coders'

function App() {
  return (
    <DesignersCoders>
      <View style={styles.container}>
        <Text>Designers Coders!</Text>
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
    </DesignersCoders>
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

export default App
