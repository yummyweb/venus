import { useState, useEffect, useRef } from "react"
import { 
    Button, 
    Progress, 
    Skeleton, 
    Flex, 
    Grid, 
    GridItem, 
    Text,
    AlertDialog,
    Box,
    useColorModeValue,
    AlertDialogBody,
    Image,
    forwardRef,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react"
import useContract from "../hooks/useContract"
import useNear from "../hooks/useNear"
import axios from "axios"
import { ethers, BigNumber } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
import { motion, isValidMotionProp } from "framer-motion"

export const TicketGrid: React.FC = () => {
    const [wallet, setWallet] = useState(null)
    const [contract, setContract] = useState(null)
    const [requestId, setRequestId] = useState<string | null>(null)
    const [events, setEvents] = useState<Event[] | null>(null)
    const [paymentLink, setPaymentLink] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()    

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
    
    const paymentDone = (eventName) => {
        // Check the balance of the request
        axios.get(`https://api.request.network/requests/${requestId}`, {
            headers: {
              Authorization: "63MTV2R-N5SM6VX-G576B9P-CGJVN27",
            }
        })
        .then(result => {
            if (result.data.request) {
                console.log(result.data)
                const request = result.data.request
                const balanceObject = request.balance
                
                if (!balanceObject) {
                    toast("Try again")
                }
                if (balanceObject.error) {
                    console.error(balanceObject.error.message)
                    return
                }
                
                console.log(`Balance of the request in ETH: ${balanceObject.balance}`) 
                // Check if the request has been paid
                // Convert the balance to big number type for comparison
                const expectedAmount = BigNumber.from(request.expectedAmount)
                const balanceBigNumber = BigNumber.from(balanceObject.balance)
                
                // Check if balanceBigNumber is greater or equal to expectedAmount
                const paid = balanceBigNumber.gte(expectedAmount)
                
                if (paid) {
                    contract.contract.updateEvent({
                        _eventName: eventName,
                        buyer: wallet.getAccountId()
                    })
                }
                else {
                    toast.error("Payment is not completed.")
                }
            }
            else {
                toast("Try again")
            }
        })
        .catch(err => console.log(err))
    }

    const buyTicket = async (price) => {
        const result = await axios.post(
          `https://api.request.network/requests/`,
          {
            // The same works with any ERC20
            currency: 'DAI',
            expectedAmount: ethers.utils.parseUnits(price.toString(), 18).toString(),
            payment: {
              // Proxy contract: the payment will be detected automatically
              // and the same address can be used several times
              type: 'erc20-proxy-contract',
              value: '0xF46e5b0d867bc1956Ce6b1539165811B700A7DA6'
            },
          },
          {
            headers: {
              Authorization: "63MTV2R-N5SM6VX-G576B9P-CGJVN27",
            },
          },
        )
        
        setPaymentLink("https://pay.request.network/" + result.data.requestId)
        setRequestId(result.data.requestId)
        setIsOpen(true)
    }


    return (
        <Grid templateColumns='repeat(3, 1fr)' style={{ margin: "80px auto"}} p={10} gap={6}>
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
                        {event.ipfsPath ? (
                            <MotionGridItem display="flex" flexDirection="column" alignItems="center" w='100%' h='430' bg={useColorModeValue('gray.200', 'gray.700')} shadow="sm" borderRadius={10}>
                                <Box overflow="hidden" bg={useColorModeValue("black", "white")} style={{ height: 200, width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }} >
                                    <Image 
                                        src={`https://ipfs.infura.io/ipfs/${event.ipfsPath}`}
                                        style={{ height: "100%", width: "100%" }} 
                                        objectFit="contain"
                                        transition="0.3s ease-in-out"
                                        _hover={{
                                            transform: 'scale(1.1)',
                                        }}
                                        transform="scale(1.0)"
                                    />
                                </Box>
                                <Flex mt={50} flexDirection="column" alignItems="center">
                                    <Text fontWeight="bold" fontSize="2xl">{ event.name.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); }) }</Text>
                                    <Text>At { event.place.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); }) }</Text>
                                    <Progress borderRadius={5} value={event.ticketsSold || event.ticketsSold === 0 ? (event.ticketsSold / event.numOfTickets) * 100 : 20} colorScheme="teal" width="300px" backgroundColor="white" mt={3} />
                                </Flex>
                                <Flex w="50%" justifyContent="space-evenly" mt={7}>
                                    <Button onClick={() => buyTicket(event.cost)} variant="ghost" colorScheme="messenger">Buy</Button>
                                    <AlertDialog
                                        isOpen={isOpen}
                                        leastDestructiveRef={cancelRef}
                                        onClose={onClose}
                                      >
                                        <AlertDialogOverlay>
                                          <AlertDialogContent>
                                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                              Buy Ticket
                                            </AlertDialogHeader>
                                    
                                            <AlertDialogBody>
                                              Here's the payment link: {paymentLink}, please pay from the link and click done when payment is completed.
                                            </AlertDialogBody>
                                    
                                            <AlertDialogFooter>
                                              <Button ref={cancelRef} onClick={onClose}>
                                                Cancel
                                              </Button>
                                              <Button colorScheme='messenger' onClick={() => paymentDone(event.name)} ml={3}>
                                                Done
                                              </Button>
                                              <Toaster />
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialogOverlay>
                                      </AlertDialog>
                                    <Button variant="solid" colorScheme="red">Report</Button>
                                </Flex>
                            </MotionGridItem>
                        ) : null}
                    </>
               ))}
            </>
            )}
        </Grid>
    )
}

const MotionGridItem = motion(GridItem)