import Portfolio from './Portfolio'
import BlobCursor from './components/BlobCursor'

export default function App() {
  return (
    <>
      <BlobCursor
        blobType="circle"
        fillColor="#24f0c9"
        trailCount={3}
        sizes={[40,60,80]}
        innerSizes={[20,35,25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6,0.6,0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      />
      <Portfolio />
    </>
  )
}
