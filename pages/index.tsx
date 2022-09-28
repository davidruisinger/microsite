import React from 'react'

import { CompaniesList, DefaultLayout } from '../components'
import { Block } from '../components/Layout/Block'
import { Section } from '../components/Layout/Section'
import { useBlockById } from '../hooks'
import { fetchAllCompanies } from '../services/lfca-backend'
import { CompanyListItemFragment } from '../services/lfca-backend/api/generated'
import { ContentProps, staticPropsWithContent } from '../utils/server-only'

interface IndexProps {
  companies: CompanyListItemFragment[]
}

function Index({ companies }: IndexProps & ContentProps) {
  const t = {
    text: useBlockById('overview.text'),
    title: useBlockById('overview.title'),
  }
  return (
    <DefaultLayout>
      <Section color="white">
        <Block
          containerWidth="mini"
          layout="center"
          text={t.text}
          title={t.title}
        />
        <div className="container" style={{ textAlign: 'center' }}>
          <CompaniesList companies={companies} />
        </div>
      </Section>
    </DefaultLayout>
  )
}

export const getStaticProps = staticPropsWithContent<IndexProps>(async () => {
  try {
    const companies = (await fetchAllCompanies()) || []

    return {
      props: {
        companies,
      },
      revalidate: 86400, // 24h
    }
  } catch (e) {
    console.error(e)

    return {
      notFound: true,
      revalidate: 300, // 5m
    }
  }
})

export default Index
