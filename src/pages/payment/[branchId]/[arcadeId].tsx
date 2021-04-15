import React, { Fragment, useEffect, useState } from 'react'

import { NextPage } from 'next'

import { onSnapshot, doc, collection, getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/router'

import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { createFirebaseInstance } from 'src/core/services/createFirebaseInstance'
import { IArcade } from 'src/core/@types/IArcade'
import { InputDialog } from 'src/core/components/inputDialog'

const Page: NextPage = props => {
  const router = useRouter()

  const arcadeId = (router.query.arcadeId ?? 'a') as string
  const branchId = (router.query.branchId ?? 'a') as string

  const [loading, setLoading] = useState<boolean>(true)
  const [targetArcade, setTargetArcade] = useState<IArcade | undefined>()

  console.log({ arcadeId, branchId })

  useEffect(() => {
    setLoading(true)

    const instance = createFirebaseInstance()

    const listeners = onSnapshot<IArcade>(doc(collection(doc(collection(getFirestore(instance), 'branches'), branchId), 'arcades'), arcadeId), doc => {
      setLoading(false)
      if (doc.exists) {
        setTargetArcade(doc.data())
      }
    })

    return () => {
      listeners()
    }
  }, [arcadeId, branchId])

  return (
    <Fragment>
      {targetArcade === undefined && (
        <div className="w-full h-screen flex justify-center items-center">
          {loading ? <div className="w-8 h-8 spinner border-2" /> : <QuestionMarkCircleIcon className="w-8 h-8" />}
        </div>
      )}
      <InputDialog arcade={targetArcade} open={targetArcade !== undefined} />
    </Fragment>
  )
}

export default Page
