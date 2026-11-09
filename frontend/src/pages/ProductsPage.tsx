import { Link } from 'react-router-dom'
import { PageIntro } from '@/components/layout/PageIntro'
import { ProductCatalog } from '@/features/products'

export function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12 md:pt-16">
      <PageIntro title="Wellness products">
        <p>
          Homeopathy remedies, hair supplements and everyday supplements to support your plan. Not sure what suits
          you?{' '}
          <Link to="/book" className="text-forest-700 underline underline-offset-4">Ask in a consultation</Link>.
        </p>
      </PageIntro>
      <div className="mt-12">
        <ProductCatalog />
      </div>
    </div>
  )
}
