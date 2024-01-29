export const Loading = () => {
  return (
    <div className="preloader fixed bottom-0 left-0 right-0 z-[999] flex h-[100dvh] items-center justify-center bg-black text-white">
      <div className="texts-container">
        <span>Loading</span>
        <span>Your</span>
        <span>Collections</span>
        <span>:)</span>
      </div>
    </div>
  )
}
