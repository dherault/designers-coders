import { useMemo, useState } from 'react'

import HierarchyContext from '../../contexts/HierarchyContext'

function DesignersCoders({ children }: any) {
  const [hierarchy, setHierarchy] = useState({})
  const hierarchyValue = useMemo(() => [hierarchy, setHierarchy, 'DesignersCoders'], [hierarchy])

  return (
    <HierarchyContext.Provider value={hierarchyValue}>
      {children}
    </HierarchyContext.Provider>
  )
}

export default DesignersCoders
