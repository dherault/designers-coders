import { Children, useMemo, useState } from 'react'

import HierarchyContext from '../../contexts/HierarchyContext'

function DesignersCoders({ children }: any) {
  const [hierarchy, setHierarchy] = useState({})
  const hierarchyValue = useMemo(() => [hierarchy, setHierarchy, 'DesignersCoders[0]'], [hierarchy])

  return (
    <>
      {Children.map(children, (child: any, i) => (
        // eslint-disable-next-line
        <HierarchyContext.Provider value={[...hierarchyValue, i]}>
          {child}
        </HierarchyContext.Provider>
      ))}
    </>
  )
}

export default DesignersCoders
