import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react"
import { WalletConnection } from "near-api-js"
import Image from "next/image"
import Router from "next/router"
import { useEffect, useState } from "react"
import useNear from "../hooks/useNear"
import { DarkModeSwitch } from "./DarkModeSwitch"
import logo from "../../public/logo.png"

export const Navbar: React.FC = () => {
	const [wallet, setWallet] = useState<WalletConnection>()

	useEffect(() => {
		useNear()
		.then(({ wallet }) => {
			setWallet(wallet)
		})
	}, [])

	const login = () => {
		if (!wallet.isSignedIn()) {
			wallet.requestSignIn(
				"example-contract.testnet",
				"Buzzle - Ticketing App"
			)
		}
	}

	return (
		<Flex bg={useColorModeValue('gray.100', 'gray.900')} height="9vh" justifyContent="space-between" alignItems="center" px={20}>
			<Flex alignItems="center" cursor="pointer" onClick={() => Router.push("/")}>
				<Image width={50} height={50} src={logo} />
				<Text ml={2} fontSize="xl">Buzzle</Text>
			</Flex>
			<Flex alignItems="center" justifyContent="space-evenly" width="40%">
				<Text fontSize="xl">My Tickets</Text>
				<Text fontSize="xl" cursor="pointer" onClick={login}>{ wallet && wallet.isSignedIn() ? wallet.getAccountId() : "Login" }</Text>
				<DarkModeSwitch />
			</Flex>
		</Flex>
	)	
}
