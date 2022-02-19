import { useState, useEffect } from "react"
import { Button, Progress, Skeleton, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import { SingleTicket } from "./SingleTicket"
import useContract from "../hooks/useContract"
import useNear from "../hooks/useNear"
import html2canvas from 'html2canvas'
import { BsTwitter } from "react-icons/bs"

export const TicketList: React.FC = () => {
    const [wallet, setWallet] = useState(null)
    const [contract, setContract] = useState(null)
    const [events, setEvents] = useState<Event[] | null>(null)
    const [base64Image, setBase64Image] = useState<string | null>(null)

	useEffect(() => {
		useNear()
		.then(({ wallet }) => {
			setWallet(wallet)
		})
	}, [])

	useEffect(() => {
		if (wallet) {
			const contract = useContract(wallet.account(), { viewMethods: ["getTickets"], sender: wallet.getAccountId() })
            setContract(contract)
		}
	}, [wallet])

    useEffect(async () => {
        if (contract) {
            const res = await contract.contract.getTickets({
                user: wallet.getAccountId()
            })
            console.log(res)
            setEvents(res)
        }
    }, [contract])

    const exportTicket = (id) => {
        document.querySelector("#hidden-" + id).style.display = "block"
        html2canvas(document.querySelector("#" + id)).then(canvas => {
            const img = canvas.toDataURL("image/png")
            var iframe = "<iframe width='100%' height='100%' src='" + img + "'></iframe>"
            var x = window.open();
            x.document.open();
            x.document.write(iframe);
            x.document.close();

        })
        document.querySelector("#hidden-" + id).style.display = "none"
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
            </>) : (
             <>
                {events.map(({ event, id }) => {
                return (
                    <>
                        {event.ipfsPath ? (<GridItem display="flex" flexDirection="column" alignItems="center" w='100%' h='430' bg='gray.200' shadow="sm" borderRadius={10}>
                            <img src={`https://ipfs.infura.io/ipfs/${event.ipfsPath}`} style={{ height: 200, width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                            <Flex mt={50} flexDirection="column" alignItems="center">
                                <Text fontWeight="bold" fontSize="2xl">{ event.name.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); }) }</Text>
                            </Flex>
                            <Flex w="50%" justifyContent="space-evenly" mt={7}>
                                <Button onClick={() => exportTicket(event.name.replace(/ /g,'') + id.toString())} colorScheme="messenger" variant="ghost">Export</Button>
                                <Button ml={5} colorScheme="twitter" onClick={() => window.open("https://twitter.com/share?text=This is the demo for Buzzle! Check it out at &url=https://buzzletickets.com", '_blank').focus()}><BsTwitter color="white" size={200} style={{ marginRight: 10 }} /> Share on Twitter</Button>
                            </Flex>
                            <div id={"hidden-" + event.name.replace(/ /g, '') + id.toString()} style={{ display: "none" }}>
                                <SingleTicket id={event.name.replace(/ /g,'') + id.toString()} details={{
                                    eventName: event.name.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); }),
                                    location: event.place,
                                    creator: event.sender,
                                    id: id,
                                    image: `https://ipfs.infura.io/ipfs/${event.ipfsPath}`
                                }} />
                            </div>
 
                        </GridItem>) : null}
                    </>
               )})}
            </>
                
            )}
        </Grid>
    )
}
