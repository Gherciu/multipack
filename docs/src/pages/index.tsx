/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import {
  Button,
  Row,
  Col,
  Typography,
  ConfigProvider,
  Divider,
  Image,
} from '@episclera/uikit'
import features from '../data/features'
import users from '../data/users'
import fundings from '../data/fundings'

const Home: React.FC<any> = () => {
  const { siteConfig } = useDocusaurusContext()
  const [showAllUsers, setShowAllUsers] = useState(false)
  const baseUrl = useBaseUrl('/')
  return (
    <ConfigProvider componentSize='large'>
      <Layout title={siteConfig.title} description={siteConfig.tagline}>
        <header className='bg-primary-color py-10'>
          <section className='container'>
            <Row>
              <Col span={24} className='flex justify-center mb-4'>
                <div className='bg-white overflow-hidden rounded-full p-5 w-28 h-28'>
                  <Image
                    width='100%'
                    src={siteConfig.favicon}
                    preview={false}
                  />
                </div>
              </Col>
              <Col span={24}>
                <Typography.Title className='text-white text-center'>
                  {siteConfig.title}
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Typography.Paragraph className='mx-auto text-white text-center text-lg w-3/7 md:w-3/5'>
                  {siteConfig.tagline}
                </Typography.Paragraph>
              </Col>
              <Col span={24} className='text-center mt-6'>
                <Button
                  type='default'
                  shape='round'
                  className='text-primary-color'
                >
                  <Link to={useBaseUrl('docs/doc-introduction')}>
                    Get Started
                  </Link>
                </Button>
              </Col>
            </Row>
          </section>
        </header>
        <main>
          {features && features.length > 0 && (
            <section className='container'>
              <Row justify='center'>
                {features.map(({ title, description }) => (
                  <Col
                    key={title}
                    span={24}
                    md={24 / 3}
                    className='pt-8 md:pt-28 md:pb-16'
                  >
                    <Typography.Title level={4}>{title}</Typography.Title>
                    <Typography.Paragraph>{description}</Typography.Paragraph>
                  </Col>
                ))}
              </Row>
            </section>
          )}
          {users && users.length > 0 && (
            <section className='container'>
              <Divider className='mb-16' />
              <Row justify='center'>
                <Col span={24} className='mb-10'>
                  <Typography.Title level={3} className='text-center'>
                    Who is Using This?
                  </Typography.Title>
                  <Typography.Paragraph className='text-center'>
                    This project is used by all these users
                  </Typography.Paragraph>
                </Col>
                {users
                  .filter(({ pinned }) => showAllUsers || pinned)
                  .map(({ title, src, to }) => (
                    <Col
                      key={title}
                      span={24}
                      md={24 / 4}
                      className='text-center pt-8 md:pt-4'
                    >
                      <Typography.Link href={to} target='_blank'>
                        <Image
                          width={200}
                          src={src}
                          preview={false}
                          className='ml-3'
                        />
                        <Typography.Title level={4} className='text-link-color'>
                          {title}
                        </Typography.Title>
                      </Typography.Link>
                    </Col>
                  ))}
                {users.length > 4 && (
                  <Col span={24} className='text-center'>
                    <Button
                      onClick={() => setShowAllUsers(!showAllUsers)}
                      type='primary'
                      shape='round'
                      className='mt-10'
                    >
                      {!showAllUsers ? 'Show more users' : 'Show less users'}
                    </Button>
                  </Col>
                )}
                {fundings && fundings.length > 0 && (
                  <Divider className='mt-16' />
                )}
              </Row>
            </section>
          )}
          {fundings && fundings.length > 0 && (
            <section className='container py-8 md:py-12'>
              <Row justify='center'>
                <Col span={24} className='mb-6'>
                  <Typography.Title level={3} className='text-center'>
                    Sponsor <Link to={baseUrl}>{siteConfig.title}</Link>{' '}
                    Development
                  </Typography.Title>
                  <Typography.Paragraph className='mx-auto text-center w-3/7 md:w-3/5'>
                    <Link to={baseUrl}>{siteConfig.title}</Link> is an MIT
                    licensed open source project and completely free to use.
                    However, the amount of effort needed to maintain and develop
                    new features for the project is not sustainable without
                    proper financial backing. You can support{' '}
                    <Link to={baseUrl}>{siteConfig.title}</Link> development via
                    the following methods:
                  </Typography.Paragraph>
                </Col>
                {fundings.map(({ src, to }) => (
                  <Col
                    key={src}
                    span={24}
                    md={24 / 6}
                    className='text-center pt-8 md:pt-4'
                  >
                    <Typography.Link href={to} target='_blank'>
                      <Image
                        width={200}
                        src={src}
                        preview={false}
                        className='ml-3'
                      />
                    </Typography.Link>
                  </Col>
                ))}
              </Row>
            </section>
          )}
        </main>
      </Layout>
    </ConfigProvider>
  )
}

export default Home
