import { ethers } from 'ethers'
import NFT from '../artifact.json'
import React, { useState, useEffect } from 'react'
import { nftContractAddress } from '../config.js'
import Link from 'next/link'

const CardDetails = () => {
  const [quantity, setQuantity] = useState(1)
  const [inputWidth, setInputWidth] = useState(36)
  const [currentAccount, setCurrentAccount] = useState('')
  const [txError, setTxError] = useState(null)
  const [txLink, setTxLink] = useState('')

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' })

      const mainnetChainId = '0x1'

      if (chainId !== mainnetChainId) {
        alert('You are not connected to the Ethereum Mainnet!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])
      setCurrentAccount(accounts[0])
      document.getElementById("connect").style.display = "none";
      document.getElementById("mint").style.display = "block";
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }

  // Creates transaction to mint NFT on clicking Mint Character button
  const mintNFT = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const nftContract = new ethers.Contract(
          nftContractAddress,
          NFT.output.abi,
          signer
        )

        var amount = parseInt(document.getElementById('amount').value)
        let nftCount = await getSupply();
        let nftPrice = nftCount < 666 ? 0 : nftCount < 4000 ? 0.0069 : 0.009;
        let totalPrice = amount * nftPrice
        let overrides = { value: ethers.utils.parseEther(totalPrice.toString()) }

        let nftTx = nftCount < 666 && amount <= 3 ? await nftContract.mintNFT(amount) : nftCount < 666 ? await nftContract.mintNFT("3") : await nftContract.mintNFT(amount, overrides)
        console.log('Mining....', nftTx.hash)
        document.getElementById('tx-status').textContent = 'Your Transaction is being mined'
        let txlink = `https://ropsten.etherscan.io/tx/${nftTx.hash}`
        setTxLink(txlink)
        document.getElementById('tx-link').textContent = 'See Your Transaction Here'

        let tx = await nftTx.wait()
        console.log('Mined!', tx)

        console.log(
          `Mined, see transaction: https://ropsten.etherscan.io/tx/${nftTx.hash}`
        )
        document.getElementById('tx-status').textContent = 'Your Transaction has been successfully mined!'

        await checkMintedNFT();
        await checkCurrentPrice();

      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      let nftCount = await getSupply();
      console.log('Error minting character', error.message)
      console.log(error.code)
      if (error.code == 'UNPREDICTABLE_GAS_LIMIT' && nftCount < 666) {
        document.getElementById('tx-status').textContent = "Warning : Max 3 NFT per OG wallet!"
        document.getElementById('tx-link').textContent = ""
      } else if (error.code == 'INSUFFICIENT_FUNDS') {
        document.getElementById('tx-status').textContent = "Warning : Your Ether balance is lower than the price!"
        document.getElementById('tx-link').textContent = ""
      }
      setTxError(error.message)
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

  const checkMintedNFT = async () => {
    let nftCount = await getSupply();
    document.getElementById('nft-count').textContent = nftCount.toString();
  }

  const checkCurrentPrice = async () => {
    let nftCount = await getSupply();
    let nftPrice = nftCount < 666 ? 0 : nftCount < 4000 ? 0.0069 : 0.009;
    if (nftPrice === 0) document.getElementById('nft-price').textContent = "FREE MINT";
    else document.getElementById('nft-price').textContent = nftPrice.toString() + " ETH";
  }

  const walletInfoChanged = async () => {
    const { ethereum } = window
    ethereum.on('accountsChanged', async function () {
      location.reload();
    });
    ethereum.on('networkChanged', async function () {
      location.reload();
    });
  }

  useEffect(() => {
    walletInfoChanged()
    checkMintedNFT()
    checkCurrentPrice()
  }, [])

  return (
    <div className='grid grid-cols-1 text-justify gap-5 md:gap-7 max-w-sm'>
      <span className='text-sm md:text-lg leading-5'>
        Welcome to OxDoodlesCats, an expansion collection of 6,666 unique doodles x cool cats!<br /><br />
        FREE 3 MINT for the first 666 OGs! Gas fee for 1 mint and 10 mints are the same!{' '}
      </span>
      <span className='text-center text-2xl md:text-4xl'><span id='nft-price' /></span>
      <div
        className='flex justify-between items-center rounded-lg p-4 text-xs h-14'
        style={{ border: '1px solid #D3D3D3' }}
      >
        <p>NFT Minted</p>
        <p><span id='nft-count' />/6666</p>
      </div>
      <div
        className='flex justify-between items-center rounded-lg px-4 text-xs h-14'
        style={{ border: '1px solid #D3D3D3' }}
      >
        <p>Quantity</p>
        <div className='text-2xl'>
          <button
            className='w-9'
            onClick={() => {
              if (quantity === 0) return
              setInputWidth((3 + quantity.toString().length) * 9)
              setQuantity((prev) => prev - 1)
            }}
          >
            -
          </button>
          <input
            className='text-center rounded-md'
            style={{ border: '1px solid #D3D3D3', width: inputWidth }}
            value={Number(quantity).toString()}
            id='amount'
            type='number'
            pattern='[0-9]*'
            onChange={(e) => {
              let realNum = 0
              if (e.target.value === '') realNum = 0
              else if (e.target.value > '10') realNum = 10
              else realNum = Number(e.target.value)
              setInputWidth((3 + realNum.toString().length || 1) * 9)
              setQuantity(realNum)
            }}
          />
          <button
            className='w-9'
            onClick={async () => {
              setInputWidth((3 + quantity.toString().length) * 9)
              let nftCount = await getSupply();
              if (nftCount < 666) {
                if (quantity < 3) setQuantity((prev) => prev + 1)
                else setQuantity(3)
              } else if (quantity < 10) setQuantity((prev) => prev + 1)
              else setQuantity(10)
            }}
          >
            +
          </button>
        </div>
      </div>
      <button
        className='flex justify-center items-center rounded-lg text-sm md:text-xl font-normal h-14'
        onClick={connectWallet}
        id='connect'
        style={{ background: '#FFD101' }}
      >
        <p>CONNECT WALLET</p>
      </button>
      <button
        className='flex justify-center items-center rounded-lg text-sm md:text-xl font-normal h-14'
        onClick={mintNFT}
        id='mint'
        style={{ background: '#FFD101', display: 'none' }}
      >
        <p>MINT NFT</p>
      </button>
      <span className='text-sm md:text-lg leading-5' id='tx-status'></span>
      <Link href={txLink}><a className='text-sm md:text-lg leading-5' target="_blank" id='tx-link'></a></Link>
    </div>
  )
}

export default CardDetails
