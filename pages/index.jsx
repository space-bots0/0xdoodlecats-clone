import Image from 'next/image'
import { ethers } from 'ethers'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import Background from '@/public/images/Background.png'
import BackgroundMobile from '@/public/images/BackgroundMobile.png'
import BackgroundXL from '@/public/images/BackgroundXL.png'

const IndexPage = () => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [correctNetwork, setCorrectNetwork] = useState(false)

  // Checks if wallet is connected
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window
    if (ethereum) {

    } else {

    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      setCurrentAccount(accounts[0])
      document.getElementById("connect").style.display = "none";
      document.getElementById("mint").style.display = "block";
    } else {

    }
  }

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window
    let chainId = await ethereum.request({ method: 'eth_chainId' })

    const mainnetChainId = '0x1'

    if (chainId !== mainnetChainId) {
      setCorrectNetwork(false)
      alert('You are not connected to the Ethereum mainnet!')
      return
    } else {
      setCorrectNetwork(true)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    checkCorrectNetwork()
  }, [])

  return (
    <>
      <div
        className='fixed h-screen w-screen overflow-hidden'
        style={{ zIndex: -1 }}
      >
        <div className='hidden xl:flex'>
          <Image
            alt='Background XL'
            src={BackgroundXL}
            placeholder='blur'
            layout='fill'
            objectFit='cover'
            quality={100}
            priority
          />
        </div>
        <div className='hidden sm:flex xl:hidden'>
          <Image
            alt='Background'
            src={Background}
            placeholder='blur'
            layout='fill'
            objectFit='cover'
            quality={100}
            priority
          />
        </div>
        <div className='block sm:hidden'>
          <Image
            alt='Background Mobile'
            src={BackgroundMobile}
            placeholder='blur'
            layout='responsive'
            // objectFit='cover'
            quality={100}
            priority
          />
        </div>
      </div>
      <div className='min-h-screen'>
        <div className='flex justify-center items-center max-w-screen-lg m-auto pt-40 md:pt-30 px-5'>
          <Card />
        </div>
        <Footer />
      </div>
    </>
  )
}
export default IndexPage
