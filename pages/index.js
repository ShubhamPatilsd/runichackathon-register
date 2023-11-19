import Error from 'next/error'
import {
  Box,
  Input,
  Divider,
  Card,
  Container,
  Text,
  Button,
  Heading,
  Flex,
  Select,
  Textarea,
  Field,
  Grid
} from 'theme-ui'
import Icon from '@hackclub/icons'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { manifest, requiredList } from '../lib/manifest.js'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-nextjs-toast'
import theme from '@hackclub/theme'

export default function Register({ notFound, registrationRecord, params }) {
  const [data, setData] = useState({})
  const [disabled, setDisabled] = useState(false)

  let keys = manifest.questions.flatMap(x => x.items.map(y => y.key))

  const router = useRouter()

  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <ToastContainer align="right" />
      <Card
        px={[4, 4]}
        py={[3, 3]}
        sx={{
          color: 'blue',
          textAlign: 'left'
        }}
      >
        <div
          style={{
            display: ['flex'],
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '20px',
            width: '100%'
          }}
        >
          <img src="/runic.svg" style={{ maxWidth: '200px', width: '45vw' }} />
        </div>
        <Box sx={{ display: ['block', 'flex'], alignItems: 'center' }}>
          <Flex sx={{ alignItems: 'center', flexGrow: 1 }}>
            <Text
              variant="subheadline"
              sx={{
                fontWeight: 900,
                color: 'blue',
                mb: 0,
                flexGrow: 1,
                ml: 2,
                textAlign: 'center',
                fontSize: 4,
                textDecoration: 'underline'
              }}
              as="div"
            >
              Register For{' '}
              <Text
                sx={{
                  textDecoration: 'none',
                  color: 'red',
                  cursor: 'pointer'
                }}
                onClick={() => window.open('https://runic.rsvp')}
              >
                Runic
              </Text>
              !
            </Text>
          </Flex>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              cursor: 'pointer',
              '> svg': { display: ['none', 'inline'] },
              mt: [2, 0]
            }}
            onClick={() => poster()}
          ></Box>
        </Box>
      </Card>
      <Card px={[4, 4]} py={[4, 4]} mt={4}>
        <Box bg="sunken" p={3} mb={3} sx={{ borderRadius: 3 }}>
          <strong>
            On January 20-21, we're going to be hosting an amazing hackathon in
            San Francisco.
          </strong>
          {/* <br />
          <br /> */}{' '}
          Consider this an invitation for you to come out and join us. We'll be
          hacking from January 20 12:00pm to January 21 12:00pm—a whole 24 hours
          of fun.
          {/* We’ll be hosted at the fantastic Figma HQ on Market Street in
          the heart of San Francisco. */}
          <br />
          <br />
          Over the weekend, you’ll explore the amazing world of code by hacking
          with co-conspirators and experiencing the energy (drinks) working on
          an innovative project. It's going to be an amazing time and we hope
          that you can be a part of it.
          <br />
          <br />
          We're so excited to meet you at Runic. Please fill out the
          registration form below to help us make the event magical for you.
          Feel free to contact{' '}
          <a href="mailto:questions@runic.rsvp">questions@runic.rsvp</a> for
          help!
        </Box>
        {manifest.questions.map((sectionItem, sectionIndex) => {
          if (typeof sectionItem.check != 'undefined') {
            if (sectionItem.check(data)) {
              return null
            }
          }
          return (
            <Box
              key={sectionIndex}
              sx={{
                mb: sectionIndex == manifest.questions.length - 1 ? 4 : 5,
                mt: sectionIndex == 0 ? 4 : 5
              }}
            >
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Text sx={{ color: 'red', fontSize: '27px', fontWeight: 800 }}>
                  {sectionItem['header']}
                </Text>
              </Box>
              <Box>
                {sectionItem.label && (
                  <Box sx={{ color: 'muted', mb: 3 }}>
                    {sectionItem['label']}
                  </Box>
                )}
                {sectionItem.items.map((item, index) => {
                  if (typeof item.check != 'undefined') {
                    if (item.check(data)) {
                      return null
                    }
                  }
                  return (
                    <Box
                      mt={1}
                      mb={4}
                      key={'form-item-' + sectionIndex + '-' + index}
                    >
                      <Field
                        label={
                          <>
                            <Text
                              mb={1}
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              {item['label']}{' '}
                              <Text
                                as="small"
                                sx={{
                                  color: 'muted',
                                  display: item.optional ? 'inline' : 'none',
                                  fontSize: '13px'
                                }}
                              >
                                (Optional)
                              </Text>
                            </Text>
                            {item.sublabel && (
                              <Text
                                sx={{
                                  fontSize: '14px',
                                  color: '#555',
                                  fontWeight: '500',
                                  mb: 2,
                                  fontFamily: `DM Sans, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Helvetica, sans-serif`
                                }}
                                as="p"
                              >
                                {item['sublabel']}
                              </Text>
                            )}
                          </>
                        }
                        onChange={e => {
                          let newData = {}
                          newData[item.key] = e.target.value
                          setData({ ...data, ...newData })
                        }}
                        placeholder={item['placeholder']}
                        as={
                          item.type == 'string'
                            ? Input
                            : item.type == 'paragraph'
                            ? Textarea
                            : item.inputType == 'checkbox'
                            ? Input
                            : Select
                        }
                        type={item.inputType}
                        required={!item.optional}
                        value={
                          data[item.key] !== undefined ? data[item.key] : ''
                        }
                        sx={{
                          border: '1px solid',
                          borderColor: 'rgb(221, 225, 228)',
                          resize: 'vertical',
                          display:
                            item.inputType == 'checkbox'
                              ? '-webkit-box'
                              : 'block'
                        }}
                        {...(item.type == 'select'
                          ? item.options
                            ? {
                                children: (
                                  <>
                                    <option value="" disabled>
                                      Select One
                                    </option>
                                    {item['options'].map(option => (
                                      <option key={option}>{option}</option>
                                    ))}
                                  </>
                                )
                              }
                            : {
                                children: <></>
                              }
                          : {})}
                      />
                      {item.words && (
                        <Text
                          sx={{ fontSize: '18px', color: 'muted', mt: 1 }}
                          as="p"
                        >
                          ( Aim for about {item.words} words
                          {data[item.key] &&
                          ', ' +
                            data[item.key].split(' ').length +
                            ' ' +
                            data[item.key].split(' ').length ==
                            1
                            ? 'word'
                            : 'words' + ' ' + 'so far.'}
                          )
                        </Text>
                      )}
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )
        })}
        <Button
          onClick={() => {
            setDisabled(true)
            toast.notify('Submitting your registration...', {
              duration: 60,
              title: 'Working...'
            })
            console.log(data)
            fetch('/api/submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
              .then(response => response.json())
              .then(({ success, error }) => {
                setDisabled(false)
                success
                  ? window.location.replace('/success')
                  : toast.notify(error, {
                      type: 'error',
                      title: 'Oops!',
                      duration: 60
                    })
              })
          }}
          style={{
            filter: true ? 'grayscale(1)' : 'grayscale(0)'
          }}
          disabled={false}
        >
          Submit
        </Button>
      </Card>
    </Container>
  )
}
