import Portfolio from './Portfolio'
import BlobCursor from './components/BlobCursor'

export default function App() {
  return (
    <>
      <BlobCursor 
      fillColor="#17b6a9"
        trailCount={5}
        sizes={[60, 50, 40, 25, 10]}
        opacities={[0.6, 0.5, 0.35]}
        shadowColor="#45a9ec"
        fastDuration={0.1}
        slowDuration={0.4}
        enableFilter={false}
        />
      <Portfolio />
    </>
  )
}
