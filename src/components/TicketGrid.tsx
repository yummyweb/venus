import { useState, useEffect } from "react"
import { Button, Progress, Skeleton, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import useContract from "../hooks/useContract"
import useNear from "../hooks/useNear"

export const TicketGrid: React.FC = () => {
    const [wallet, setWallet] = useState(null)
    const [contract, setContract] = useState(null)
    const [events, setEvents] = useState<Event[] | null>(null)

	useEffect(() => {
		useNear()
		.then(({ wallet }) => {
			setWallet(wallet)
		})
	}, [])

	useEffect(() => {
		if (wallet) {
			const contract = useContract(wallet.account(), { changeMethods: ["createEvent", "updateEvent"], viewMethods: ["getEvents"], sender: wallet.getAccountId() })
            setContract(contract)
		}
	}, [wallet])

    useEffect(async () => {
        if (contract) {
            const res = await contract.contract.getEvents()
            setEvents(res)
        }
    }, [contract])

    const buyTicket = async (eventName) => {
        await contract.contract.updateEvent({
            _eventName: eventName,
            buyer: wallet.getAccountId()
        })
    }


    return (
        <Grid templateColumns='repeat(3, 1fr)' mt={10} p={10} gap={6}>
            {!events ? (
            <>
                <GridItem display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" w='100%' h='200' bg='gray.200' shadow="sm" borderRadius={10}>
                    <Skeleton borderRadius={10} height="full" width="full" />
                </GridItem>
                <GridItem display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" w='100%' h='200' bg='gray.200' shadow="sm" borderRadius={10}>
                    <Skeleton borderRadius={10} height="full" width="full" />
                </GridItem>
                <GridItem display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" w='100%' h='200' bg='gray.200' shadow="sm" borderRadius={10}>
                    <Skeleton borderRadius={10} height="full" width="full" />
                </GridItem>
                <GridItem display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" w='100%' h='200' bg='gray.200' shadow="sm" borderRadius={10}>
                    <Skeleton borderRadius={10} height="full" width="full" />
                </GridItem>
            </>
            ) : (
            <>
                {events.map(event => (
                    <>
                        {event.ipfsPath ? (<GridItem display="flex" flexDirection="column" alignItems="center" w='100%' h='430' bg='gray.200' shadow="sm" borderRadius={10}>
                            <img src={`https://ipfs.infura.io/ipfs/${event.ipfsPath}`} style={{ height: 200, width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                            <Flex mt={50} flexDirection="column" alignItems="center">
                                <Text fontWeight="bold" fontSize="2xl">{ event.name.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); }) }</Text>
                                <Text>At { event.place.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); }) }</Text>
                                <Progress borderRadius={5} value={event.ticketsSold || event.ticketsSold === 0 ? (event.ticketsSold / event.numOfTickets) * 100 : 20} colorScheme="teal" width="300px" backgroundColor="white" mt={3} />
                            </Flex>
                            <Flex w="50%" justifyContent="space-evenly" mt={7}>
                                <Button onClick={() => buyTicket(event.name)} variant="ghost" colorScheme="messenger">Buy</Button>
                                <Button variant="solid" colorScheme="red">Report</Button>
                            </Flex>
                        </GridItem>) : null}
                    </>
               ))}
            </>
            )}
        </Grid>
    )
}
