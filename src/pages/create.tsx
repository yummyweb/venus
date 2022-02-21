import { useState, useEffect, useRef } from "react"
import useNear from "../hooks/useNear" 
import useContract from "../hooks/useContract"
import { Navbar } from "../components/Navbar";
import { Icon, Button, InputGroup, InputLeftAddon, Text, useColorModeValue, FormControl, FormLabel, NumberInputStepper, NumberInput, NumberIncrementStepper, NumberDecrementStepper, NumberInputField, FormHelperText, Input, Flex } from "@chakra-ui/react"
import { create } from "ipfs-http-client" 
import { FiFile } from "react-icons/fi"

const client = create("https://ipfs.infura.io:5001/api/v0")

export default function Create() {
	const [wallet, setWallet] = useState<WalletConnection>(null)
    const [contract, setContract] = useState(null)
    const [name, setName] = useState<string>(null)
    const [numOfTickets, setNumOfTickets] = useState<number>(null)
    const [place, setPlace] = useState<string>(null)
    const [cost, setCost] = useState<string>(null)
    const [ipfsPath, setIPFSPath] = useState<string>(null)

    const inputRef = useRef<HTMLInputElement | null>(null)
    const handleFormClick = () => inputRef.current.click()

	useEffect(() => {
		useNear()
		.then(({ wallet }) => {
			setWallet(wallet)
		})
	}, [])

	useEffect(() => {
		if (wallet) {
			const contract = useContract(wallet.account(), { changeMethods: ["createEvent"], sender: wallet.getAccountId() })
            setContract(contract)
		}
	}, [wallet])

    const createEvent = async () => {
        await contract.contract.createEvent({
            eventName: name,
            numOfTickets: parseInt(numOfTickets),
            place,
            cost: parseInt(cost),
            ipfsPath,
            ticketsSold: 0
        })
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0]
        try {
            const added = await client.add(file)
            setIPFSPath(added.path)
        }
        catch (e) {
			console.log(e)
            alert("Error while uploading file")
        }
    }

	return (
		<>
			<Navbar />
			<Flex flexDirection="column" m={20} width="60%">
				<Text fontWeight="bold" fontSize="3xl">Create Event</Text>
				<FormControl mt={10}>
			  		<FormLabel htmlFor='name'>Name</FormLabel>
			  		<Input focusBorderColor={useColorModeValue("red.400", "red.500")} id='name' value={name} onChange={e => setName(e.target.value)} type='text' />
			  		<FormHelperText>Name for your event.</FormHelperText>
				</FormControl>
				<FormControl mt={10}>
					<FormLabel htmlFor='tickets'>Number of Tickets</FormLabel>
					<NumberInput focusBorderColor={useColorModeValue("red.400", "red.500")} max={25000} min={10}>
						<NumberInputField id='tickets' value={numOfTickets} onChange={e => setNumOfTickets(parseInt(e.target.value))} />
				    	<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
		    			</NumberInputStepper>
					</NumberInput>
					<FormHelperText>Maximum number of tickets for your event.</FormHelperText>
				</FormControl>
				<FormControl mt={10}>
					 <FormLabel htmlFor='place'>Place</FormLabel>
					 <Input focusBorderColor={useColorModeValue("red.400", "red.500")} id='place' type='text' value={place} onChange={e => setPlace(e.target.value)} />
				     <FormHelperText>The place where the event is taking place.</FormHelperText>
				</FormControl>
				<FormControl mt={10}>
					 <FormLabel htmlFor='cost'>Cost</FormLabel>
					 <InputGroup>
						<InputLeftAddon children='$' />
					 	<Input focusBorderColor={useColorModeValue("red.400", "red.500")} id='cost' type='text' value={cost} onChange={e => setCost(e.target.value)} />
					 </InputGroup>
					 <FormHelperText>Cost for each ticket in USD.</FormHelperText>
				</FormControl>
                <FormControl mt={10}>
                    <FormLabel>Poster</FormLabel>
                    <input type="file" ref={e => {
                        inputRef.current = e
                    }} multiple={false} hidden accept="image/*" onChange={onFileChange} />
                    <Button onClick={handleFormClick} leftIcon={<Icon as={FiFile} />}>
                        Upload
                    </Button>
                </FormControl>
				<Button _hover={{ bg: "red.500" }} onClick={createEvent} bg="red.400" color="white" mt={12} width="30%">Create Event</Button>
			</Flex>
		</>
	)
}

