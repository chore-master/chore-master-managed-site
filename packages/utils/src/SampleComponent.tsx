'use client'

import React from 'react'

const SampleComponent = ({ children }: { children: React.ReactNode }) => (
  <button onClick={() => alert('Hello, world!')}>{children}</button>
)

export default SampleComponent
