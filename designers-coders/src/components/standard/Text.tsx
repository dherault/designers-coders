import { Text } from 'react-native'

import withWrapper from '../hoc/withWrapper'

export default process.env.NODE_ENV === 'production' ? Text : withWrapper(Text)
