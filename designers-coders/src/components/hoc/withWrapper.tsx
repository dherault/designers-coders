import { View } from 'react-native'

function withWrapper(Component: any) {
  return function Wrapper(props: any) {
    return (
      <>
        Wrap
        <Component {...props} />
      </>
    )
  }
}

export default withWrapper
