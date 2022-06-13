import { View } from 'react-native'

function withWrapper(Component: any) {
  return function Wrapper(props: any) {
    return (
      <Component {...props} />
    )
  }
}

export default withWrapper
