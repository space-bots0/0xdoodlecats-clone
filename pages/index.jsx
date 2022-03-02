import Image from 'next/image'
import { ethers } from 'ethers'
import NFT from '../artifact.json'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { nftContractAddress } from '../config.js'
import Background from '@/public/images/Background.png'
import BackgroundMobile from '@/public/images/BackgroundMobile.png'
import BackgroundXL from '@/public/images/BackgroundXL.png'

const IndexPage = () => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [correctNetwork, setCorrectNetwork] = useState(false)

  // Checks if wallet is connected
  const checkIfWalletIsConnected = async () => {

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      setCurrentAccount(accounts[0])
      let nftCount = await getSupply();
      document.getElementById("connect").style.display = "none";

      if (nftCount < 2222) {
        document.getElementById("mint").style.display = "block";
        document.getElementById("sold").style.display = "none";
      } else {
        document.getElementById("sold").style.display = "block";
        document.getElementById("mint").style.display = "none";
      }
    }
  }

  const getSupply = async () => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(
      nftContractAddress,
      NFT.output.abi,
      signer
    )

    let nftCount = nftContract.totalSupply()
    const getNftCount = async () => {
      const result = await nftCount;
      return parseInt(result);
    }

    var result = await getNftCount();
    return result;
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
