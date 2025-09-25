export default defineNuxtPlugin(() => {
  const { $router } = useNuxtApp()

  const detectMobileDevice = (): boolean => {
    if (process.server) return false

    const userAgent = navigator.userAgent || navigator.vendor
    const screenWidth = window.innerWidth
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Check for mobile user agents
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    const isMobileUserAgent = mobileRegex.test(userAgent)

    // Check screen size (mobile-first breakpoint)
    const isMobileScreen = screenWidth <= 768

    // Combine factors for mobile detection
    return isMobileUserAgent || (isMobileScreen && isTouchDevice)
  }

  const setLayoutBasedOnDevice = () => {
    const isMobile = detectMobileDevice()
    const route = useRoute()

    // Skip layout setting if already explicitly set
    if (route.meta.layout) return

    // Set layout based on device detection
    if (isMobile) {
      setPageLayout('mobile')
    } else {
      setPageLayout('default')
    }
  }

  // Set layout on initial load
  onMounted(() => {
    setLayoutBasedOnDevice()
  })

  // Listen for resize events to handle orientation changes
  let resizeTimeout: NodeJS.Timeout
  const handleResize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      setLayoutBasedOnDevice()
    }, 250)
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    clearTimeout(resizeTimeout)
  })

  // Watch for route changes and apply layout detection
  $router.afterEach(() => {
    nextTick(() => {
      setLayoutBasedOnDevice()
    })
  })
})