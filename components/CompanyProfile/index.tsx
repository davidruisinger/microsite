import { Avatar, Tabs } from 'antd'
import { useMemo, useState } from 'react'

import { useBlockById } from '../../hooks'
import { RootCategoriesDataProps } from '../../services/contentful/fetch-root-categories'
import {
  CompanyActionFragment,
  CompanyDetailsFragment,
} from '../../services/lfca-backend/api/generated'
import { getCategoryMeta } from '../../utils/get-category-meta'
import { ActionsList } from '../ActionsList'
import { scrollToId, SectionWrapper } from '../SectionWrapper'
import { PopoverFilter } from './PopoverFilter'
import styles from './styles.module.less'

interface CompanyProfileProps {
  company: CompanyDetailsFragment
  rootCategoriesData: RootCategoriesDataProps
}

export const CompanyProfile = ({
  company,
  rootCategoriesData,
}: CompanyProfileProps) => {
  const t = {
    disclaimerText: useBlockById('disclaimer.text'),
    navActionsAbout: useBlockById('profile.nav.about'),
    navActionsCompleted: useBlockById('profile.nav.actionstaken'),
    navActionsPlanned: useBlockById('profile.nav.actionsplanned'),
    profileTitle: useBlockById('profile.title'),
  }

  const rootCategories = useMemo(() => {
    return rootCategoriesData.categoryTree.map((c) => ({
      id: c.fields.categoryId,
      name: c.fields.name,
    }))
  }, [rootCategoriesData])

  const [activeRootCategories, setActiveRootCategories] = useState(
    rootCategories.map((r) => r.id)
  )

  const filterActionByCategory = (a: CompanyActionFragment) => {
    const actionRootCategoryId = getCategoryMeta(
      rootCategoriesData,
      a.categories[0]?.id
    )?.fields?.categoryId

    return activeRootCategories.indexOf(actionRootCategoryId) > -1
  }

  const sections = [
    {
      children: (
        <ActionsList
          actions={company.completedCompanyActions.filter(
            filterActionByCategory
          )}
          key="actions-completed"
          rootCategoriesData={rootCategoriesData}
        />
      ),
      key: 'actions-completed',
      label: t.navActionsCompleted,
      renderCondition: company.completedCompanyActions.length > 0,
    },
    {
      children: (
        <>
          <div className="meta-title">Actions planned</div>
          <ActionsList
            actions={company.plannedCompanyActions.filter(
              filterActionByCategory
            )}
            rootCategoriesData={rootCategoriesData}
          />
        </>
      ),
      key: 'actions-planned',
      label: t.navActionsPlanned,
      renderCondition: company.plannedCompanyActions.length > 0,
    },
    {
      children: (
        <>
          <div className="meta-title">About</div>
          {company.aboutSections?.map((section, i) => (
            <div className="about-section" key={`section-${i}`}>
              <div className="about-section-title">{section?.heading}</div>
              <div className="about-section-text">{section?.text}</div>
            </div>
          ))}
        </>
      ),
      key: 'about',
      label: t.navActionsAbout,
      renderCondition: company.aboutSections
        ? company.aboutSections?.length > 0
        : false,
    },
  ]
  // state to actively manage tabs
  const [activeNavItem, setActiveNavItem] = useState(sections[0].key)

  return (
    <div className={styles['company-profile']}>
      <header className="header">
        <div className="header-meta">
          <div className="super-title">{t.profileTitle}</div>
          <div className="name">{company.name}</div>
        </div>
        <Avatar
          alt={company.name || 'logo'}
          className="company-logo"
          size={100}
          src={company.logoUrl}
        />
      </header>

      <div className="navigation">
        <Tabs
          activeKey={activeNavItem}
          items={sections
            .filter((i) => i.renderCondition)
            .map((s) => ({ ...s, children: null }))}
          onChange={(key) => scrollToId(key)}
          tabBarExtraContent={
            <PopoverFilter
              activeRootCategories={activeRootCategories}
              rootCategories={rootCategories}
              setActiveRootCategories={setActiveRootCategories}
            />
          }
        />
      </div>

      {sections
        .filter((i) => i.renderCondition)
        .map((item) => (
          <SectionWrapper
            id={item.key}
            key={item.key}
            setActiveNavItem={setActiveNavItem}
          >
            {item.children}
          </SectionWrapper>
        ))}

      <div className="disclaimer">
        {t.disclaimerText}{' '}
        <a href={`mailto:support@lfca.earth`}>support@lfca.earth</a>
      </div>
    </div>
  )
}