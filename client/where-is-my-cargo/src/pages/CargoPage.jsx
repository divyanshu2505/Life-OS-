import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FeaturedCarousel from '../components/FeaturedCarousel'
import LiveStrip from '../components/LiveStrip'
import CategoryBar from '../components/CategoryBar'
import CardGrid from '../components/CardGrid'
import PriorityHighlight from '../components/PriorityHighlight'
import SearchSection from '../components/SearchSection'
import StatSection from '../components/StatSection'

gsap.registerPlugin(ScrollTrigger)

export default function CargoPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="page-cargo">
      <FeaturedCarousel />
      <LiveStrip />
      <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />
      <CardGrid filter={activeCategory} />
      <PriorityHighlight />
      <SearchSection />
      <StatSection />
    </div>
  )
}
