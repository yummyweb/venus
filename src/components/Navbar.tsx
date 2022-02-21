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
				"Debook - Ticketing App"
			)
		}
	}

	return (
		<Flex as="header" position="fixed" w="100%" style={{ top: "0px" }} backgroundColor={useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)")} backdropFilter="saturate(180%) blur(5px)" zIndex={200} height="9vh" justifyContent="space-between" alignItems="center" px={20}>
			<Flex alignItems="center" cursor="pointer" onClick={() => Router.push("/")}>
				<Image width={35} height={35} src={logo} />
				<Text ml={2} fontSize="xl">Debook</Text>
			</Flex>
			<Flex alignItems="center" justifyContent="space-evenly" width="40%">
				<Text fontSize="xl" cursor="pointer" onClick={() => Router.push("/tickets")}>My Tickets</Text>
				<Text fontSize="xl" cursor="pointer" onClick={login}>{ wallet && wallet.isSignedIn() ? wallet.getAccountId() : "Login" }</Text>
				<DarkModeSwitch />
			</Flex>
		</Flex>
	)	
}
