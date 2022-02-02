import { Navbar } from "../components/Navbar";
import { Button, InputGroup, InputLeftAddon, Text, FormControl, FormLabel, NumberInputStepper, NumberInput, NumberIncrementStepper, NumberDecrementStepper, NumberInputField, FormHelperText, Input, Flex } from "@chakra-ui/react"

export default function Create() {
	return (
		<>
			<Navbar />
			<Flex flexDirection="column" m={20}>
				<Text fontWeight="bold" fontSize="3xl">Create Event</Text>
				<FormControl mt={10}>
			  		<FormLabel htmlFor='name'>Name</FormLabel>
			  		<Input id='name' type='text' />
			  		<FormHelperText>Name for your event.</FormHelperText>
				</FormControl>
				<FormControl mt={10}>
					<FormLabel htmlFor='tickets'>Number of Tickets</FormLabel>
					<NumberInput max={25000} min={10}>
						<NumberInputField id='tickets' />
				    	<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
		    			</NumberInputStepper>
					</NumberInput>
					<FormHelperText>Maximum number of tickets for your event.</FormHelperText>
				</FormControl>
				<FormControl mt={10}>
					 <FormLabel htmlFor='place'>Place</FormLabel>
					 <Input id='place' type='text' />
				     <FormHelperText>The place where the event is taking place.</FormHelperText>
				</FormControl>
				<FormControl mt={10}>
					 <FormLabel htmlFor='cost'>Cost</FormLabel>
					 <InputGroup>
						<InputLeftAddon children='$' />
					 	<Input id='cost' type='text' />
					 </InputGroup>
					 <FormHelperText>Cost for each ticket in USD.</FormHelperText>
				</FormControl>
				<Button colorScheme="teal" mt={12} width="30%">Create Event</Button>
			</Flex>
		</>
	)
}
