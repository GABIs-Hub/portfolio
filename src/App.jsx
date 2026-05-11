import Portfolio from './Portfolio'
import BlobCursor from './components/BlobCursor'

export default function App() {
  return (
    <>
      <BlobCursor
        blobType="circle"
        fillColor="#24f0c9"
        trailCount={5}
        sizes={[50, 40, 30, 20, 10]}
        innerSizes={[25, 20, 15, 10, 5]}
        innerColor="rgba(255,255,255,0.6)"
        opacities={[0.8, 0.65, 0.5, 0.35, 0.2]}
        shadowColor="rgba(36,240,201,0.5)"
        shadowBlur={15}
        shadowOffsetX={0}
        shadowOffsetY={0}
        filterStdDeviation={15}
        useFilter={true}
        fastDuration={0.08}
        slowDuration={0.35}
        zIndex={100}
      />
      <Portfolio />
    </>
  )
}
