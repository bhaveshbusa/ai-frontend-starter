'use client'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useEffect, useState, Suspense } from 'react'
import { componentRegistry } from '@/components/registry/componentRegistry'

function IntentPageContent() {
  const params = useSearchParams()
  const componentName = params.get('component')
  const [Component, setComponent] = useState<any>(null)

  useEffect(() => {
    if (componentName && componentRegistry[componentName]) {
      componentRegistry[componentName]().then((mod) => setComponent(() => mod.default))
    }
  }, [componentName])

  if (!Component) return <div>Loading...</div>
  return <Component />
}

export default function IntentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IntentPageContent />
    </Suspense>
  )
}
