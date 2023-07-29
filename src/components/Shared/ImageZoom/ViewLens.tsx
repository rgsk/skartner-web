import { CSSProperties } from 'react'

interface IViewLensProps {
  styles: CSSProperties
}
const ViewLens: React.FC<IViewLensProps> = ({ styles }) => {
  return (
    <div
      style={{
        ...styles,
        background: 'url(/lens.svg)',
        opacity: 0.6,
      }}
    ></div>
  )
}

export default ViewLens
