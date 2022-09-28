import { FieldTimeOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

import {
  AnimatedLoader,
  Block,
  BlurComponent,
  CompanyProfile,
  FrameworkElements,
  MicrositeLayout,
  ScrollPageHero,
  Section,
} from '../../components'
import { useBlockById } from '../../hooks'
import {
  fetchRootCategories,
  RootCategoriesDataProps,
} from '../../services/contentful'
import { fetchCompanyDetails, fetchStats } from '../../services/lfca-backend'
import {
  CompanyDetailsFragment,
  CounterStatsResultFragment,
} from '../../services/lfca-backend/api/generated'
import { hasReachedMicrositeAchievement } from '../../utils'
import { ContentProps, staticPropsWithContent } from '../../utils/server-only'

interface CompanyPageParams extends ParsedUrlQuery {
  slug: string
}

interface CompanyPageProps {
  company: CompanyDetailsFragment
  rootCategoriesData: RootCategoriesDataProps
  stats: CounterStatsResultFragment
}

const SUPPORT_MAIL = 'support@lfca.earth'

const CompanyPage = ({
  company,
  rootCategoriesData,
  stats,
}: CompanyPageProps & ContentProps) => {
  const router = useRouter()

  const t = {
    alertDisabledButton: useBlockById('alert.disabled.button.primary'),
    alertDisabledDescription: useBlockById('alert.disabled.description'),
    alertDisabledTitle: useBlockById('alert.disabled.title'),
    joinButtonPrimary: useBlockById('join.button.primary'),
    joinDescription: useBlockById('join.description', {
      company: company.name || '',
    }),
    joinTitle: useBlockById('join.title'),
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback)
    return (
      <AnimatedLoader
        label="Did you know that we lose 1.2 Trillion Tons of Ice Each Year?"
        title="Updating page"
      />
    )

  const meta = {
    hasReachedMicrositeOnce: hasReachedMicrositeAchievement(
      company.achievementContendIdsReachedOnce
    ),
    subscriptionType: company.subscriptionType,
  }
  const isOnFreePlan = meta.subscriptionType === 'FREE'

  return (
    <MicrositeLayout
      company={company}
      scrollableContent={
        <BlurComponent
          blurAlertProps={{
            action: (
              <a href={`mailto:${SUPPORT_MAIL}`}>
                <Button icon={<QuestionCircleOutlined />} size="small">
                  {t.alertDisabledButton}
                </Button>
              </a>
            ),
            description: t.alertDisabledDescription,
            icon: <FieldTimeOutlined />,
            title: t.alertDisabledTitle,
          }}
          isBlurred={!meta.hasReachedMicrositeOnce || isOnFreePlan}
        >
          <CompanyProfile
            company={company}
            rootCategoriesData={rootCategoriesData}
          />
        </BlurComponent>
      }
      staticContent={
        <ScrollPageHero companyName={company.name} stats={stats} />
      }
    >
      <Section id="framework">
        <FrameworkElements rootCategoriesData={rootCategoriesData} />
      </Section>
      <Section color="blue" id="share">
        <Block
          actions={[
            <a
              href={`https://lfca.earth`}
              key="join"
              rel="noreferrer"
              target="_blank"
            >
              <Button size="large">{t.joinButtonPrimary}</Button>
            </a>,
          ]}
          containerWidth="mini"
          text={t.joinDescription}
          title={t.joinTitle}
        />
      </Section>
    </MicrositeLayout>
  )
}

export const getStaticProps = staticPropsWithContent<
  CompanyPageProps,
  CompanyPageParams
>(async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    }
  }

  try {
    const company = await fetchCompanyDetails(params.slug)
    const rootCategoriesData = await fetchRootCategories()
    const stats = await fetchStats()

    if (!company) {
      return {
        notFound: true,
        revalidate: 86400, // 24h
      }
    }

    return {
      props: {
        company,
        rootCategoriesData,
        stats,
      },
      revalidate: 86400, // 24h
    }
  } catch (e) {
    console.error(e)

    return {
      notFound: true,
      revalidate: 86400, // 24h
    }
  }
})

export const getStaticPaths: GetStaticPaths<CompanyPageParams> = async () => {
  return {
    fallback: true,
    paths: [],
  }
}

export default CompanyPage
