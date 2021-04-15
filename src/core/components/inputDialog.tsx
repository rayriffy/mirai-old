import React, { Fragment, useCallback, useMemo, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import {
  TicketIcon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
} from '@heroicons/react/outline'
import { getCalculatedPrice } from 'src/core/services/getCalculatedPrice'

import { IBranch } from '../@types/IBranch'
import { IArcade } from '../@types/IArcade'

interface IProps {
  open?: boolean
  onClose?(): void
  arcade?: IArcade
}

export const InputDialog: React.FC<IProps> = props => {
  const { open = false, onClose = () => {}, arcade = { title: '###', tokenPerCredit: 3, discountedPrice: 25 } } = props

  const targetSystem = {
    maxToken: 20,
  }

  const targetUser = {
    balance: 250,
  }

  const [inputToken, setInputToken] = useState<number>(
    arcade.tokenPerCredit
  )
  const calculatedPrice = useMemo(
    () =>
      getCalculatedPrice(
        inputToken,
        arcade.tokenPerCredit,
        arcade.discountedPrice,
      ),
    [inputToken]
  )

  const isIncreaseDisabled = useMemo(
    () => inputToken >= targetSystem.maxToken,
    [inputToken]
  )
  const onInputIncrease = useCallback(() => {
    const inputResult = inputToken + 1

    if (!isIncreaseDisabled) {
      setInputToken(inputResult)
    }
  }, [inputToken, isIncreaseDisabled])

  const isDecreaseDisabled = useMemo(() => inputToken === 1, [inputToken])
  const onInputDecrease = useCallback(() => {
    const inputResult = inputToken - 1

    if (inputResult !== 0) {
      setInputToken(inputResult)
    }
  }, [inputToken, isIncreaseDisabled])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-sm w-full sm:p-6">
              <div>
                {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div> */}
                <div className="text-center sm:mt-4">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl leading-6 font-semibold text-gray-900 py-3 sm:pt-0"
                  >
                    {arcade.title}
                  </Dialog.Title>
                  <div className="my-6 text-center flex justify-center">
                    <div className="relative mt-2">
                      <h1 className="text-3xl font-bold">{calculatedPrice.price}฿</h1>
                      {calculatedPrice.isDiscounted && (
                        <h2 className="absolute -right-8 -top-5 text-lg font-medium line-through text-gray-700">
                          {calculatedPrice.original}฿
                        </h2>
                      )}
                    </div>
                  </div>
                  <div className="my-2 mx-6">
                    <div className="">
                      <label
                        htmlFor="inputToken"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        Token
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <TicketIcon
                              className="h-6 w-6 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            type="text"
                            name="token"
                            id="inputToken"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-12 sm:text-base border-gray-300"
                            placeholder="3"
                            value={inputToken.toString()}
                            disabled
                          />
                        </div>
                        <div className="flex flex-col">
                          <button
                            className={`-ml-px relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-none rounded-tr-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                              isIncreaseDisabled
                                ? 'bg-gray-100 hover:bg-gray-200'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            onClick={onInputIncrease}
                            disabled={isIncreaseDisabled}
                          >
                            <PlusIcon
                              className="h-4 w-4 text-gray-400"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className={`-ml-px relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-none rounded-br-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                              isDecreaseDisabled
                                ? 'bg-gray-100 hover:bg-gray-200'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            onClick={onInputDecrease}
                            disabled={isDecreaseDisabled}
                          >
                            <MinusIcon
                              className="h-4 w-4 text-gray-400"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 py-4 max-w-xs mx-auto">
                    <div className="space-x-4 flex items-center justify-center">
                      <div className="text-center">
                        <h1>Before</h1>
                        <h2 className="text-xl font-semibold">{targetUser.balance}฿</h2>
                      </div>
                      <div>
                        <ArrowRightIcon className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <h1>After</h1>
                        <h2 className="text-xl font-semibold">{targetUser.balance - calculatedPrice.price}฿</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={onClose}
                >
                  Pay
                </button>
                <button
                  type="button"
                  className="mt-1 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
