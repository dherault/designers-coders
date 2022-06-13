import { useContext, useMemo } from 'react'

import HierarchyContext from '../../contexts/HierarchyContext'

function withWrapper(Component: any) {
  return function Wrapper(props: any) {
    const [hierarchy, setHierarchy, previousHierarchyPath] = useContext(HierarchyContext)
    const hierarchyPath = `${previousHierarchyPath}>${Component.displayName}`
    const hierarchyValue = useMemo(() => [hierarchy, setHierarchy, hierarchyPath], [hierarchy, setHierarchy, hierarchyPath])

    console.log('hierarchyPath', hierarchyPath)

    return (
      <HierarchyContext.Provider value={hierarchyValue}>
        <Component {...props} />
      </HierarchyContext.Provider>
    )
  }
}

export default withWrapper
