import { View } from 'react-native'

import withWrapper from '../hoc/withWrapper'

export default process.env.NODE_ENV === 'production' ? View : withWrapper(View)
