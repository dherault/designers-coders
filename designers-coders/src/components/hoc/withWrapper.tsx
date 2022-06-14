import { Children, useContext, useMemo } from 'react'

import HierarchyContext from '../../contexts/HierarchyContext'

function withWrapper(Component: any) {
  return function Wrapper(props: any) {
    const [hierarchy, setHierarchy, previousHierarchyPath, childIndex] = useContext(HierarchyContext)
    const hierarchyPath = `${previousHierarchyPath}>${Component.displayName}[${childIndex}]`
    const hierarchyValue = useMemo(() => [hierarchy, setHierarchy, hierarchyPath], [hierarchy, setHierarchy, hierarchyPath])

    console.log('hierarchyPath', hierarchyPath)

    return (
      <Component {...props}>
        {Children.map(props.children, (child: any, i) => (
          // eslint-disable-next-line
          <HierarchyContext.Provider value={[...hierarchyValue, i]}>
            {child}
          </HierarchyContext.Provider>
        ))}
      </Component>

    )
  }
}

export default withWrapper
