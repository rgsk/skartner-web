import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useCallback, useRef } from 'react'
import QuickPinchZoom, {
  make3dTransformValue,
  UpdateAction,
} from 'react-quick-pinch-zoom'
interface IPinchZoomImageProps {
  children: any
  setZoomed: Dispatch<SetStateAction<boolean>>
  buttonContainerHeight: number
}
const PinchZoomImage: React.FC<IPinchZoomImageProps> = ({
  children,
  setZoomed,
  buttonContainerHeight,
}) => {
  const childrenContainerRef = useRef<HTMLImageElement>(null)
  const quickPinchZoomRef = useRef<QuickPinchZoom>(null)
  const [zoomFactor, setZoomFactor] = useState(-1)
  const [updateAction, setUpdateAction] = useState<UpdateAction>({
    x: 0,
    y: 0,
    scale: 1,
  })
  const clickZoomRef = useRef(true)
  const onUpdate = useCallback((updateAction: UpdateAction) => {
    setUpdateAction(updateAction)
    const { current: img } = childrenContainerRef
    if (img) {
      const value = make3dTransformValue(updateAction)
      img.style.setProperty('transform', value)
    }
  }, [])

  useEffect(() => {
    if (updateAction.scale > 1) {
      // setting zoomFactor as -1, prevents zooming in on double tap
      setZoomFactor(-1)
    } else {
      setZoomFactor(1)
    }
  }, [updateAction.scale])

  useEffect(() => {
    if (Math.abs(updateAction.scale - 1) < 0.1) {
      if (!clickZoomRef.current) {
        setZoomed(false)
      }
    }
  }, [setZoomed, updateAction])

  useEffect(() => {
    const el = quickPinchZoomRef.current
    if (el) {
      const mid = window.innerWidth / 2
      el.scaleTo({ x: mid, y: mid + buttonContainerHeight, scale: 2 })
      setTimeout(() => {
        clickZoomRef.current = false
      }, 500)
    }
  }, [buttonContainerHeight])

  return (
    <QuickPinchZoom
      ref={quickPinchZoomRef}
      onUpdate={onUpdate}
      tapZoomFactor={zoomFactor}
      onDoubleTap={() => {
        const el = quickPinchZoomRef.current
        if (el) {
          if (updateAction.scale > 1) {
            // when user is zoomed in and he double taps
            // we want to reset scale to 1
            el.scaleTo({ x: 0, y: 0, scale: 1 })
          }
        }
      }}
    >
      <div ref={childrenContainerRef}>{children}</div>
    </QuickPinchZoom>
  )
}
export default PinchZoomImage
