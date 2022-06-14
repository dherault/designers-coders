import { Children, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { PanResponder, StyleSheet, View } from 'react-native'

import HierarchyContext from '../../contexts/HierarchyContext'

function withWrapper(Component: any) {
  return function Wrapper(props: any) {
    const componentRef = useRef<View>()
    const [dimensions, setDimension] = useState<any>({})

    // Hierarchy
    const [hierarchy, setHierarchy, previousHierarchyPath, childIndex] = useContext(HierarchyContext)
    const hierarchyPath = `${previousHierarchyPath}>${Component.displayName}[${childIndex}]`
    const hierarchyValue = useMemo(() => [hierarchy, setHierarchy, hierarchyPath], [hierarchy, setHierarchy, hierarchyPath])
    // console.log('hierarchyPath', hierarchyPath, hierarchy.activePath)

    if (hierarchy.activePath === hierarchyPath) {
      console.log(hierarchy)
    }

    // Drag n Drop
    const handleStartShouldSetPanResponder = useCallback(() => hierarchy.activePath === hierarchyPath, [hierarchy.activePath, hierarchyPath])
    const handleMoveShouldSetPanResponder = useCallback(() => false, [])
    const handlePanResponderGrant = useCallback(() => {
      setHierarchy((x: any) => ({ // TODO remove any
        ...x,
        dragWidth: dimensions.width,
        dragHeight: dimensions.height,
        dragTargetWidth: Infinity,
        dragTargetHeight: Infinity,
      }))
    }, [setHierarchy, dimensions])
    const handlePanResponderMove = useCallback((e: any, gestureState: any) => {
      // console.log('gestureState', gestureState)
      setHierarchy((x: any) => { // TODO remove any
        const next = {
          ...x,
          dragX: gestureState.moveX,
          dragY: gestureState.moveY,
        }

        if (
          gestureState.moveX <= x.dragTargetX
          || gestureState.moveX >= x.dragTargetX + x.dragTargetWidth
          || gestureState.moveY <= x.dragTargetY
          || gestureState.moveY >= x.dragTargetY + x.dragTargetHeight
        ) {
          next.dragTargetWidth = Infinity
          next.dragTargetHeight = Infinity
        }

        return next
      })
    }, [setHierarchy])
    const handlePanResponderRelease = useCallback(() => {
      setHierarchy((x: any) => ({ // TODO remove any
        ...x,
        dragTargetPath: null,
        dragTargetWidth: null,
        dragTargetHeight: null,
        dragTargetX: null,
        dragTargetY: null,
        dragWidth: null,
        dragHeight: null,
        dragX: null,
        dragY: null,
      }))
    }, [setHierarchy])
    const handlePanResponderTerminate = useCallback(() => {
      handlePanResponderRelease()
    }, [handlePanResponderRelease])

    const panResponder = useMemo(() => PanResponder.create({
      onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
      onPanResponderGrant: handlePanResponderGrant,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
      onPanResponderTerminate: handlePanResponderTerminate,
    }), [
      handleStartShouldSetPanResponder,
      handleMoveShouldSetPanResponder,
      handlePanResponderGrant,
      handlePanResponderMove,
      handlePanResponderRelease,
      handlePanResponderTerminate,
    ])

    useEffect(() => {
      if (!componentRef.current) return

      componentRef.current.measure((fx, fy, width, height, px, py) => {
        setDimension({ fx, fy, width, height, px, py })
      })
    }, [hierarchyPath])

    useEffect(() => {
      if (typeof dimensions.px === 'undefined') return
      if (hierarchy.activePath === hierarchyPath) return
      if (hierarchy.dragX === null) return

      const { px, py, width, height } = dimensions
      const { dragX, dragY, dragTargetPath, dragTargetWidth, dragTargetHeight } = hierarchy

      if (
        dragTargetPath !== hierarchyPath
        && px <= dragX
        && dragX <= px + width
        && py <= dragY
        && dragY <= py + height
        && width <= dragTargetWidth
        && height <= dragTargetHeight
      ) {
        setHierarchy((x: any) => ({
          ...x,
          dragTargetPath: hierarchyPath,
          dragTargetWidth: width,
          dragTargetHeight: height,
          dragTargetX: px,
          dragTargetY: py,
        }))
      }
    }, [dimensions, hierarchy, setHierarchy, hierarchyPath])

    function handlePress() {
      setHierarchy((x: any) => ({ ...x, activePath: hierarchyPath })) // TODO remove any
    }

    return (
      <Component
        {...props}
        {...panResponder.panHandlers}
        ref={componentRef}
        onPress={handlePress}
        selectable={false}
        style={[
          props.style,
          hierarchy.activePath === hierarchyPath ? styles.active : null,
          hierarchy.dragTargetPath === hierarchyPath ? styles.dragTarget : null,
        ]}
      >
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

const styles = StyleSheet.create({
  active: {
    border: '1px solid gold',
    margin: -1,
  },
  dragTarget: {
    border: '1px solid red',
    margin: -1,
  },
})

export default withWrapper
